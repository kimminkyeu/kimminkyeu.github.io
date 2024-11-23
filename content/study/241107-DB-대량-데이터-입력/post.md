---
draft : false
date: '2024-11-07'
title: 'DB에 대량의 데이터를 넣는 방법'
author: "김민규"
tags: ["커널 360", "MySQL", "프로젝트"]
---

## DB에 대량의 데이터 넣는 방법
프로젝트를 진행하던 중 프론트 측에서 나중에 대량의 데이터를 가지고, 렌더링 최적화를 하고 싶다고 하여 대량의 데이터를 DB에 넣는 방법을 찾아보게 되었습니다.

떠오른 아이디어는 총 2가지가 있었습니다.
1. sql 파일에 직접 10000개의 insert문 작성하여 실행하기.
2. JPA를 이용하여 반복문 10000번 돌면서 insert하기.

이 2가지 방법 모두 블로그 글들을 찾아본 결과 `상당한 시간이 소요`된다는 글이 많이 보였습니다.
블로그 글에서 위 2가지 방식 외에 다른 좋은 방법을 알려주어 시도해보게 되었습니다.

블로그 글에서 제시해준 아이디어는 `bulk insert`입니다.
bulk insert에 대한 정의는 아래에서 자세히 살펴보도록 하겠습니다.

## insert vs bulk insert
insert : `insert into pick values()`를 `10000번 실행`시키는 것입니다.
```sql
INSERT INTO 테이블명 (컬럼1, 컬럼2, 컬럼3, ...) VALUES (값1_1, 값1_2, 값1_3, ...);
INSERT INTO 테이블명 (컬럼1, 컬럼2, 컬럼3, ...) VALUES (값2_1, 값2_2, 값2_3, ...);
INSERT INTO 테이블명 (컬럼1, 컬럼2, 컬럼3, ...) VALUES (값3_1, 값3_2, 값3_3, ...);
INSERT INTO 테이블명 (컬럼1, 컬럼2, 컬럼3, ...) VALUES (값4_1, 값4_2, 값4_3, ...);
INSERT INTO 테이블명 (컬럼1, 컬럼2, 컬럼3, ...) VALUES (값5_1, 값5_2, 값5_3, ...);
```

bulk insert : `insert into pick values()` -> `VALUES`에 여러 행을 넣어서 `1번만 실행`시키는 방식입니다.
```sql
INSERT INTO 테이블명 (컬럼1, 컬럼2, 컬럼3, ...)
VALUES
    (값1_1, 값1_2, 값1_3, ...),
    (값2_1, 값2_2, 값2_3, ...),
    (값3_1, 값3_2, 값3_3, ...),
    ...
    (값N_1, 값N_2, 값N_3, ...);
```
insert문을 여러 번 실행시키는 것이 아닌 `VALUES`에 여러 행을 넣어서 1번만 실행시키는 방식입니다.
즉, bulk insert의 경우 `VALUES에 10000개의 행`이 들어가게 됩니다.

둘의 차이를 알고 난 이후 `JPA로 bulk insert`를 구현할 수 있는지에 대해 궁금하여 JPA를 하나씩 파헤쳐 보았습니다.

### JPA save
```java
// PickService
@Transactional
public PickResult.Pick saveNewPick(PickCommand.Create command) {
    validateRootAccess(command.parentFolderId());
    validateFolderAccess(command.userId(), command.parentFolderId());
    var pick = pickDataHandler.savePick(command);
    pick.getParentFolder().getChildPickIdOrderedList().add(pick.getId());
    
    List<Long> tagOrderList = pick.getTagIdOrderedList();
    List<Tag> tagList = tagDataHandler.getTagList(tagOrderList);
    for (Tag tag : tagList) {
	    if (ObjectUtils.notEqual(tag.getUser(), pick.getUser())) {
		    throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
	    }
	    pickDataHandler.savePickTag(pick, tag);
    }
    
    return pickMapper.toPickResult(pick);
}

// PickDataHandler에서 호출
Pick savedPick = pickRepository.save(pickMapper.toEntity(command, user, folder, link));
```
현재 로직은 하나씩 save 하기 때문에 당연히 bulk insert가 되지 않는다고 생각하게 되었습니다.
그렇다면, JPA에서 제공해주는 `saveAll()` 메서드를 쓰면 bulk insert가 되지 않을까? 라는 생각이 들었습니다.
JPA에서 구현체가 어떤 방식으로 처리하는지 궁금하여 구현체를 파헤쳐 보았습니다.

`SimpleJpaRepository.class`
1. save
```java
@Transactional
public <S extends T> S save(S entity) {
    Assert.notNull(entity, "Entity must not be null");
    if (this.entityInformation.isNew(entity)) {
        this.entityManager.persist(entity);
        return entity;
    } else {
        return this.entityManager.merge(entity);
    }
}
```
2. saveAll
```java
@Transactional
public <S extends T> List<S> saveAll(Iterable<S> entities) {
    Assert.notNull(entities, "Entities must not be null");
    List<S> result = new ArrayList();
    Iterator var4 = entities.iterator();

    while(var4.hasNext()) {
        S entity = (Object)var4.next();
        // 핵심 부분
        result.add(this.save(entity));
    }

    return result;
}
```
`saveAll` 메서드를 살펴보면, 반복문을 돌면서 하나씩 save하는 것을 확인하실 수 있습니다.
그렇기 때문에 saveAll을 사용해도 bulk insert가 아닌 하나씩 insert하는 것을 알게 되었습니다.

JPA로는 bulk insert가 불가능하기 때문에 bulk insert를 구현하는 방법에 대하여 찾아본 결과 `JdbcTemplate`을 이용하면 됩니다.

### JdbcTemplate bulk insert
```java
@Transactional
public void bulkInsertPick(List<PickCommand.Create> pickList) {
    String sql = "INSERT INTO pick (user_id, link_id, parent_folder_id, title, tag_order, memo, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
	    @Override
	    public void setValues(PreparedStatement ps, int i) throws SQLException {
		    PickCommand.Create pick = pickList.get(i);
		    Link link = getOrCreateLink(pick.linkInfo());
		    ps.setLong(1, pick.userId());
		    ps.setLong(2, link.getId());
		    ps.setLong(3, pick.parentFolderId());
		    ps.setString(4, pick.title());
		    ps.setString(5,
			    String.join(" ", pick.tagIdOrderedList().stream().map(String::valueOf).toArray(String[]::new)));
		    ps.setString(6, pick.memo());
		    ps.setString(7, String.valueOf(LocalDateTime.now()));
		    ps.setString(8, String.valueOf(LocalDateTime.now()));
	    }
    
	    @Override
	    public int getBatchSize() {
		    return pickList.size();
	    }
    });
}
```
JdbcTemplate의 구현체로 `BatchPreparedStatementSetter`를 이용하면 bulk insert 연산이 가능하게 됩니다.

최상단에 문자열로 작성된 sql문을 보시면, insert into 하나만 사용하는 것을 확인하실 수 있습니다.

`setValues` 메서드는 `getBatchSize` 만큼 반복하면서 `VALUES (?, ?, ?, ?, ?, ?, ?, ?)`에 행들을 추가하게 됩니다.
`bulkInsertPick`의 파라미터로 받은 `pickList`의 크기만큼 반복하면서 pick 관련 정보들을 values에 추가하게 됩니다.

이렇게 bulk insert에 대한 구현이 끝나게 되었습니다.
대량의 데이터를 insert 해보지 않아 구현 방법이 떠오르지 않았고, 어렵다고 생각했지만 생각보다 쉽게 구현할 수 있었습니다.

마지막으로 두 방식 모두 얼마나 시간 소요가 들지에 대하여 궁금하여 측정을 해보았습니다.

## 시간 비교
### 1. 10000번 insert
```java
@Test
@DisplayName("픽 10000개 normal insert test")
void pickInsertTest() {
    long start = System.currentTimeMillis();
    for (int i = 0; i < 10000; i++) {
	    LinkInfo linkInfo = new LinkInfo("test" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
	    PickCommand.Create command = new PickCommand.Create(user.getId(), "테스트 제목", "테스트 메모", new ArrayList<>(),
		    unclassified.getId(), linkInfo);
	    pickService.saveNewPick(command);
    }
    long end = System.currentTimeMillis();
    
    log.info("normal insert time : {}", (end - start));
}
```
### 2. bulk insert
```java
@Test
@DisplayName("픽 10000개 bulk insert test")
void pickBulkInsertTest() {
    long start = System.currentTimeMillis();
    pickService.saveBulkPick(user.getId(), unclassified.getId());
    long end = System.currentTimeMillis();
    
    log.info("bulk insert time : {}", (end - start));
}
```
### 결과
```java
normal insert time : 374661
bulk insert time : 20192
```
![image](https://github.com/user-attachments/assets/aaea5692-1eb1-4e1c-a93d-cf9f9d55acf6)

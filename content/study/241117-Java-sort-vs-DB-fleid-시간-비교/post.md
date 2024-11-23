---
draft : false
date: '2024-11-17'
title: '자바에서 정렬하기 vs DB에서 정렬하기'
author: "김민규"
tags: ["커널 360", "자바", "MySQL", "프로젝트"]
---

프로젝트 도중 복잡한 정렬 로직이 필요한 상황이 있었다.
자바 코드 상에서 직접 정렬하는 것과, DB의 ORDER BY를 이용해 정렬하는 것의 성능 차이를 한번 측정해보았다.

<!--more-->

## Java Sort
```java
@Transactional(readOnly = true)
@MeasureTime
public List<PickResult.FolderPickList> getFolderListChildPickList(PickCommand.ReadList command) {
    return command.folderIdList().stream()
	.peek(folderId -> validateFolderAccess(command.userId(), folderId))  // 폴더 접근 유효성 검사
	.map(this::getFolderChildPickResultList)
	.toList();
}

private PickResult.FolderPickList getFolderChildPickResultList(Long folderId) {
    Folder folder = folderDataHandler.getFolder(folderId);
    List<Pick> pickList = pickDataHandler.getPickListPreservingOrder(folder.getChildPickIdOrderedList());
    List<PickResult.Pick> pickResultList = pickList.stream()
	    .map(pickMapper::toPickResult)
	    .toList();
    return pickMapper.toPickResultList(folderId, pickResultList);
}
```

## DB fleid
```java
@MeasureTime
public List<PickResult.Pick> getPickList(Long userId, List<Long> folderIdList) {
    if (folderIdList == null || folderIdList.isEmpty()) {
	    return List.of();
    }
    
    List<Long> pickIdList = folderIdList.stream()
	    .flatMap(folderId -> getChildPickIdOrderedList(folderId).stream())
	    .toList();
    
    if (pickIdList.isEmpty()) {
	    return List.of();
    }
    
    String orderListStr = pickIdList.stream()
	    .map(String::valueOf)
	    .collect(Collectors.joining(", "));
    
    Expression<Integer> orderByField = Expressions.template(Integer.class,
	    "FIELD({0}, " + orderListStr + ")", pick.id);
    
    OrderSpecifier<Integer> orderSpecifier = new OrderSpecifier<>(Order.ASC, orderByField);
    
    return jpaQueryFactory
	    .select(pickResultFields())
	    .from(pick)
	    .where(
		    userEqCondition(userId)
	    )
	    .orderBy(orderSpecifier)
	    .fetch();
}

private List<Long> getChildPickIdOrderedList(Long folderId) {
    return jpaQueryFactory
	    .select(folder.childPickIdOrderedList)
	    .from(folder)
	    .where(folder.id.eq(folderId))
	    .fetchOne();
}
```

## 픽 10만 건 조회 결과
```java
Java Sort -> getFolderListChildPickList 실행 시간 : 14 ms 
DB Fleid -> getPickList 실행 시간 : 65 ms
```

### 결론 : Java Sort가 DB fleid 함수에 비해 4배 정도 빠르다.
이 결과가 나온 이유는 DB 조회(select)도 자주 일어나고, DB에서 정렬 조건에 따라 정렬하는 것이 생각보다 오래걸린다는 것을 확인함.
단순한 정렬이었다면, DB 정렬이 더 빨랐을 것 같음.

폴더에서 가져온 픽 리스트들이 정렬 조건이자 검색 조건이 되어서 시간 소요가 큰 것으로 예측된다.
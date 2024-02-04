### 테스트 버전입니다.
## 배포 링크 : [kimminkyeu.github.io](https://kimminkyeu.github.io/)

게시글은 매일 06시, 18시에 업데이트됩니다. 
```yaml
# check github action file
on:
  schedule:
    - cron: '0  6,18  * * *' # Run at  06:00 am, 18:00 pm every day.
    #     *      *          *           *           *
    #  | min | hour | dayOfTheMonth | month | dayOfTheWeek |
```

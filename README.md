# 웹 자판기 - HTML, CSS

`HTML` `CSS` `JAVASCRIPT` 의 기본기능을 이용한 **웹 개발을 시작**할 수 있으며, 웹에서 동작하는 자판기를 구현할 것입니다. 

<br />

<br />

# 개발 log

1. [[STEP 1] 구조화 설계](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step1.md)
2. [[STEP 2] CSS 기본 스타일 적용](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step2.md)
3. [[STEP 3] CSS Layout 적용](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step3.md)
4. [[STEP 4] 지갑에서 돈 선택](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step4.md)
5. [[STEP 5] 돈 투입 후 UI 변경](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step5.md)
6. [[STEP 6] 로깅과 구입가능 상품표시](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step6.md)
7. [[STEP 7] 상품 선택](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step7.md)
8. [[STEP 8] 지연 처리](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step8.md)
9. [[STEP 9] 코드 개선하기](https://github.com/antaehyeon/javascript-vm/tree/antaehyeon/README/step8.md)
10. [[STEP 10] 테스트코드 작성하기](https://github.com/antaehyeon/javascript-vm/blob/antaehyeon/README/step10.md)

<br />

<br />

# HTML5 태그 의미 From [HTML 태그사전](https://opentutorials.org/module/552)

- #### section : 문서나 응용프로그램의 일반적인 섹션

  - 제목으로 시작하는 Content를 의미적으로 그룹핑하기 위해 사용됩니다.
  - section요소를 사용할 수 있는 예로는 챕터나 탭으로 구분된  **대화상자에서 탭된 페이지**, 또는 논문의 번호가 매겨진 색션이 될 수 있습니다. 홈페이지에서는 소개, 뉴스 아이템, 연락처등이 섹션으로 분리될 수 있습니다.
  - 요소의 컨텐츠를 배포해도 이치에 맞다면 **section요소대신 article요소를 사용할것을 권장**합니다.
  - section요소는 일반적인 컨테이너 요소는 아닙니다. 요소가 단순히 스타일링을 위한 목적이나 스크립팅의 편의를 위해서 필요할때 section요소보다는 div요소를 사용할것을 권장합니다.

<br/>

- #### article : 문서내에서 독립적인 컨텐츠를 나타냅니다.

  - article요소는 포럼의 글이 될수도 있고, 잡지나 신문의 기사일 수도 있으며, 블로그의 글이나 사용자가 올린 의견이나 상호작용적인 위젯이나 가젯 또는 다른 **어떤 독립적인 아이템**등이 될 수 있습니다.
  - 하나의 문서 안에서 **여러개의 article**가 올 수 있습니다.
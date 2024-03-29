# <img width="4%" src="public/logo.svg"> UpLog

기업, 개발자, 의뢰인이 소통할 수 있는 릴리즈 노트 공유 시스템을 개발했습니다. 현재 리팩터링을 진행하고 있습니다.
개발을 시작하기 전, 2주 동안 프로젝트의 컨셉과 UI를 설계하고 개발을 시작했습니다.

<br/>

### 👥 참여인원

- 가천대학교 컴퓨터공학과 권오현 [Github](https://github.com/5hyun) | qhslsl@gmail.com

- 가천대학교 소프트웨어학과 오채영 [Github](https://github.com/CHCHAENG) | oco6029@naver.com

<br/>

## ✍️ 프로젝트 소개

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e2579bed-63f8-4c45-8fd7-19fa9113270b">

<br/>

### 제품

- 제품은 기업이 진행하고 있는 하나의 비지니스를 의미합니다.
- 제품 안에는 여러 개의 프로젝트(버전)가 존재합니다.

### 프로젝트(버전)

- 프로젝트는 제품 안에 있는 하나의 버전을 의미합니다.
- 프로젝트 안에는 여러 개의 그룹이 존재합니다.
- 프로젝트의 그룹 안에는 Post와 Task가 존재합니다.
- 예시로 맨 처음 프로젝트의 이름을 Version 1.0.0으로 설정하고, 그 안에 그룹을 생성을 하면 Task, Post 작성이 가능하며 칸반보드를 이용하여 Task를 관리할 수 있습니다.

<br/>

## 🔑 권한과 역할 정의

### 권한

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a91615b5-034c-4b6b-a504-f7133460f570">

### 역할

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/93ded869-abe9-46cc-9c61-38aa9ab66cdb">
<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/20f5f900-3cfb-40ce-89b6-1c3243d4539c">
<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/44920092-44b9-4625-a2f3-36b21045c842">
<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/35db4c05-a0d1-43fd-8d6d-0093c9900660">

## 🎯 기술 스택

<img width="100%" alt="스크린샷 2024-02-15 오전 3 16 14" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/87c22d4d-55bd-4ab3-b44d-efd21f813d3b">

<br/>

## 📝 Architecture 설계도

- Kakao I Cloud 이용

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/f045d522-e19e-4019-8bdf-e864d35b99c7"/>

<br/>

- AWS 이용

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/1e2d8fed-3617-46b0-ad10-89a690f2cb62"/>

<br/>

## 💻 프로젝트 실행 방법

```shell
git@github.com:GAK-coding/UpLog-frontEnd.git
cd UpLog-frontEnd
yarn
yarn dev
```

<br/>

## Demo 영상

https://www.youtube.com/watch?v=Jk-_V03pTn0
<br/>
<br/>

## ❓ UpLog 프로젝트 소개

1. [메인페이지](#메인페이지)
2. [회원가입](#회원가입)
3. [로그인](#로그인)
    - [비밀번호 찾기](#비밀번호-찾기)
4. [마이페이지](#마이페이지)
5. [제품](#제품-1)
    - [제품 생성](#제품-생성)
    - [제품에서 프로젝트 생성](#제품에서-프로젝트-생성)
    - [제품 멤버 관리](#제품-멤버-관리)
6. [프로젝트 버전과 변경이력 관리](#프로젝트-버전과-변경이력-관리)
    - [변경이력 추가](#변경이력-추가)
    - [변경이력 작성 과정](#변경이력-작성-과정)
    - [변경이력 작성 완료](#변경이력-작성-완료)
    - [프로젝트 완료](#프로젝트-완료)
7. [프로젝트 상위 그룹 관리](#프로젝트-상위-그룹-관리)
    - [상위 그룹 추가](#상위-그룹-추가)
8. [프로젝트 하위 그룹 관리](#프로젝트-하위-그룹-관리)
    - [프로젝트 상위 그룹 관리 페이지](#프로젝트-상위-그룹-관리-페이지)
    - [하위 그룹 생성 모달](#하위-그룹-생성-모달)
    - [제품 멤버를 프로젝트 및 프로젝트 그룹에 초대하기](#제품-멤버를-프로젝트-및-프로젝트-그룹에-초대하기)
    - [하위 그룹 생성 완료 및 수정 후](#하위-그룹-생성-완료-및-수정-후)
9. [프로젝트 상세 페이지](#프로젝트-상세-페이지)
10. [프로젝트 Menu 관리](#프로젝트-menu-관리)
    - [Menu 생성](#menu-생성)
    - [Menu 이동](#menu-이동)
    - [결과물 Menu](#결과물-menu)
11. [프로젝트 Post 관리](#프로젝트-post-관리)
    - [Post가 없는 상태](#post가-없는-상태)
    - [Post 생성 과정](#post-생성-과정)
    - [Post 세부기능](#post-세부기능)
12. [프로젝트 Task 관리](#프로젝트-task-관리)
    - [Task가 없는 상태](#task가-없는-상태)
    - [Task 생성 과정](#task-생성-과정)
    - [칸반보드](#칸반보드)
13. [다크모드 지원](#다크모드-지원)

## 메인페이지

#### 로그인 전

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e02cf24a-a70b-4b72-a7a5-8911eaab2cac"/>

#### 로그인 후

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/196cd56a-fa1b-40ef-87ba-2591700f68ba"/>

<br/>
<br/>

## 회원가입

- 개인 회원과 기업 회원 중 선택하여 회원가입이 가능합니다.
- 이메일 인증을 하고 회원가입을 완료할 수 있습니다.

<video src="https://github.com/GAK-coding/UpLog-frontEnd/assets/86971770/662db149-6c3b-49d2-80c2-d99ee045dd30"></video>

<br/>
<br/>

## 로그인

- 회원가입 후 로그인이 가능합니다.

<video src="https://github.com/GAK-coding/UpLog-frontEnd/assets/86971770/805b6dc3-068d-452c-a413-514add8d2183
"></video>

### 비밀번호 찾기

- 비밀번호를 잃어버렸을 경우, 이메일을 통해서 비밀번호 찾기가 가능합니다.

<video src="https://github.com/GAK-coding/UpLog-frontEnd/assets/86971770/dd87520e-3496-436e-836f-371c0db3cd68"></video>

<br/><br/>

## 마이페이지

- 이름, 닉네임, 프로필 사진 수정이 가능합니다.
- 비밀번호 변경을 클릭하면 모달창이 뜹니다.
- 현재 비밀번호, 새로운 비밀번호를 입력하고 변경이 가능합니다.
- 계정 삭제 기능을 제공합니다.

<video src="https://github.com/GAK-coding/UpLog-frontEnd/assets/86971770/76434232-8d3f-4e20-bc06-5eed67a66409
"></video>
(Mock API를 사용해서 이미지 변경 시 다른 이미지가 나옵니다.)

<br/>

## 제품

### 제품 생성

- 기업 권한으로 회원가입한 회원은 제품 생성이 가능합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/5fd5746c-a45c-4ce3-b8c5-9976b64319c1"/>

<br/>

#### 제품 생성 후

- 제품 생성을 완료하고 초기 모습입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/c008537b-3e5b-4f01-9faa-bec9857beea7"/>

<br/>


### 제품에서 프로젝트 생성

- "프로젝트 추가하기"를 눌러, 프로젝트 추가 모달에서 프로젝트 생성이 가능합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3d24b6ec-3123-4bef-b697-bd8594360491"/>

<br/>

- 프로젝트 추가를 후 모습입니다.
- 프로젝트에 대한 더 자세한 설명은 아래에 "프로젝트"에 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/55f9bae6-2f34-41ba-ba77-e700d2f73740"/>

<br/>

### 제품 멤버 관리

#### 초기 상태

- 처음엔 제품을 생성한 기업 회원과 마스터로 초대된 회원 2명이 존재합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/9d97ef82-1d2d-4f69-9723-afd528c1f596"/>

<br/>

#### 리더로 초대하기

- '리더로 초대하기' 체크 박스 체크 후, 멤버를 초대하면 리더권한의 멤버를 초대할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/2501230f-fa82-4d7a-a78c-607ac9e2b19a"/>
<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/cb700e51-b84c-46b0-a6c3-221e408f611d"/>

<br/>

#### 일반 멤버로 초대하기

- '리더로 초대하기' 체크 박스를 체크하지 않으면 일반 멤버로 초대가 가능합니다.
- ","를 구분으로 한 번에 여러 명 멤버를 초대할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/18230549-ff0e-4e75-9bad-73a0ceb1ed3e"/>
<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/17b2e83e-ec14-4736-8279-7b29f543d435"/>
<br/>

#### 리더 권한 위임 및 방출

- 권한 위임을 통해 일반 멤버에게 리더 권한을 부여할 수 있습니다.
- 멤버 방출의 기능을 제공합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/140480c1-e414-4e53-a7aa-03d49e8d26c0"/>
<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/fa3c7e49-08bf-4a2a-8584-410352422935"/>

<br/><br/>

## 프로젝트 버전과 변경이력 관리

### 변경이력 추가

- "변경이력 추가" 버튼을 누르면 변경 이력을 추가하여 제품 멤버들과 공유가 가능합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/df4a5b23-503a-4959-a2b6-5b43ec628c21"/>

<br/>

### 변경이력 작성 과정

- 변경에 대한 Type과 변경 내용을 작성할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/982aa589-9304-431f-8be6-7db434c69a20"/>
<br/>

### 변경이력 작성 완료

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/341ccd57-7c43-469a-bd39-1f9ba73912a5"/>
<br/>

### 프로젝트 완료

- "1.0.0" 프로젝트를 완료한 모습이며 완료된 프로젝트는 "날짜" 부분에 완료한 날짜가 기록됩니다.
- 진행중인 프로젝트가 있다면 프로젝트를 추가할 수 없습니다.
- 완료된 프로젝트는 더 이상 수정이 불가능합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/649b0933-6096-405e-ad86-d2a95fef6cd3">

<br/><br/>

## 프로젝트 상위 그룹 관리

- 프로젝트 그룹에는 상위 그룹과 하위 그룹이 존재합니다.

<br/>

### 상위 그룹 추가

- 왼쪽 사이드 바 하단의 "+" 버튼을 누르면 상위 그룹 추가 모달이 뜹니다.
- 상위 그룹 이름과 초대 멤버를 지정할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/dc455bbb-e07e-46f6-a42f-1b52a4381985"/>

<br/>

- 상위 그룹이 추가되고 난 후의 모습입니다.
- 왼쪽 사이드바 'Group' 리스트에 새로운 그룹이 추가된 것을 확인할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/69100a05-c0c8-4bcb-ba54-2c52ca606e9d"/>

<br/><br/>

## 프로젝트 하위 그룹 관리

### 프로젝트 상위 그룹 관리 페이지

- 프로젝트 상위 그룹 관리 페이지 초기 화면입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/efd5b6ff-6fa7-4107-8866-50364d82596b"/>

<br/>

### 하위 그룹 생성 모달

- "그룹 추가" 버튼을 누르면 하위 그룹 생성이 가능합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/424194a2-b926-4b43-95bb-b8aacf9722aa"/>

<br/>

- "모든 멤버" 부분에서 그룹 내 모든 멤버가 있으며 그룹에 배정이 가능합니다.
- 한 멤버는 여러 그룹에 들어갈 수 있습니다.
- "나가기" 버튼은 자신이 속한 그룹 이름 오른쪽에 있으며, 자기 자신만 "나가기 버튼"이 보입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3a6071d2-6a97-400a-98cf-d9e397b282cf"/>

<br/>

### 제품 멤버를 프로젝트 및 프로젝트 그룹에 초대하기

- 제품에 있는 다른 멤버를 프로젝트에 추가할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/4e8074fe-ffc3-4301-80f0-ffd524bd3309"/>

<br/>

### 하위 그룹 생성 완료 및 수정 후

- 그룹과 멤버 수정을 한 모습입니다.
- 왼쪽 사이드 바에도 그룹 관리에서 반영한 하위 그룹이 반영됩니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/ee7b15cf-fa54-4de8-aa13-04c5e6bbd3a3"/>
<img width="35%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/77d10660-519d-4c0b-916e-1c6e49705fcd"/>

<br/><br/>

## 프로젝트 상세 페이지

- 프로젝트 버전과 변경이력 관리 페이지에서 버전을 클릭하면 프로젝트 상세 관리 페이지로 이동합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/649b0933-6096-405e-ad86-d2a95fef6cd3">

<br/><br/>

## 프로젝트 Menu 관리

- 프로젝트 버전별로 메뉴를 관리할 수 있습니다.
- 메뉴별로 Post, Task 관리가 가능합니다.
- `'결과물', '요구사항', '개발', '배포'` 메뉴는 기본으로 제공되는 메뉴이며, 4가지 메뉴 외로, 메뉴를 생성, 수정, 삭제할 수 있습니다.

### Menu 생성

- 메뉴는 최대 15개까지 생성이 가능합니다.
- 중복된 메뉴 이름은 생성할 수 없습니다.
- 빈 값으로 메뉴 이름을 설정할 수 없습니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/6df266de-67bc-462d-b8d1-16f632b05213"/>

<br/>


### Menu 이동

- 5개 단위로 메뉴 리스트를 제공하며, 슬라이드 기능을 통해 손쉽게 이동할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/6eb68947-618f-4cad-82d7-e68830e8743a"/>

<br/>

### 결과물 Menu

- `결과물` 메뉴는 의뢰인에게만 보여지는 메뉴로, Post 작성 기능만 제공되며, Task 작성은 불가능합니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/16071540-13a3-4891-9f9b-79b66499a912"/>

<br/><br/>

## 프로젝트 Post 관리

#### Post가 없는 상태

- Post가 작성되어 있지 않은 상태입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/1a296046-56f1-45f5-8a2b-ca25ecbafc5f"/>

### Post 생성 과정

- "글쓰기"를 누르면 Post 작성 모달이 뜹니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/d7ce7441-a1d1-4911-a820-e26efe5d682c"/>

<br/>

- 메뉴와 타입을 선택하여 글을 작성할 수 있습니다.

<img width="80%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/68f5f132-9949-4f61-9d3f-55800c3b82d7"/>

<br/>

- 타입은 "요청", "필독"으로 이루어져 있으며 선택 사항입니다.

<img width="80%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/33a5e9cc-6c6f-44e8-9f41-bc91d7765978"/>

<br/>

- 태그 기능을 활용하여 글을 작성할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/5b147cd3-94bb-4d90-894d-eab018971798"/>

<br/>

#### Post 생성 완료

- Post 작성이 완료된 모습입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a733663f-495a-40b1-a3c0-d63775cc4f13"/>

<br/>
<br/>

### Post 세부기능

- Post "수정", "공지", "삭제" 기능을 제공합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3892ac4e-9056-4149-8a9b-12c4dcd8cfc4"/>

<br/>

#### Post 공지

- Menu별로 Post를 공지할 수 있습니다.
- "공지"로 설정된 Post는 해당 Menu 제일 상단에 배치됩니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/13354c27-bcaf-47da-9fef-c38affd37a2d"/>

<br/>

#### Post 공지설정

- Post를 공지로 설정하면, 이전에 설정 되어있던 Post는 공지설정이 해제되고, 공지로 설정된 Post가 새롭게 등록됩니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/80225816-a459-4d60-b59a-a307630faa5c"/>

<br/>

- '공지해제'를 통해 기존에 공지로 설정 되어있는 Post 공지를 해제할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/c9db7c30-4fe5-42df-9e17-a97141eb79c0"/>

<br/>

#### Post 좋아요, 댓글

- Post별로 좋아요와 댓글 기능을 제공합니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/d1f2b45a-9c97-4c44-95d9-999b7a0039c3"/>

<br/><br/>

## 프로젝트 Task 관리

#### Task가 없는 상태

- Task가 없는 상태의 화면입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/8bbe3949-7dbe-48d5-88bd-af002bfec694"/>
<br/>

### Task 생성 과정

- "Task 생성하기"를 눌러 Task 생성 모달을 통해 생성할 수 있습니다.

<img width="60%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e11059af-f00b-4346-b3dc-8025671cc04a"/>

<br/>

- 현재 날짜를 기준으로 1~3주를 선택하여 자동으로 기간 설정이 가능합니다.

<img width="60%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/93287dd7-e399-4754-9825-80d61d1ecab0"/>

<br/>

- 시작 날짜와 종료 날짜를 사용자가 직접 지정 할 수 있습니다.

<img width="60%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/69c72464-10ad-4370-a528-8c8de09c11cb"/>
<br/>

- Task를 등록할 Menu와 Task 할당자를 선택할 수 있습니다.

<img width="60%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/e0106d51-af0f-4990-a0fe-455243d4ef17"/>

<br/>

#### Task 생성 완료

- Task가 생성되고 난 후의 모습입니다.
- Task가 해당되는 Menu, Task의 상태, 할당자의 프로필 사진을 확인할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/c8e0665b-f7ab-4141-939b-6766b044ad83"/>

<br/>

### Task 수정

- 수정기능을 통해, Task의 모든 내용을 수정할 수 있습니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/a3480d4a-544a-4fdc-b519-3b927388ecf7"/>

<br/>

### Task 상태

- 왼쪽 상단에 원형을 통해 Task의 상태를 손쉽게 확인할 수 있습니다.
- 분홍색 원형은 `진행 전`, 파랑색 원형은 `진행 중`, 초록색 원형은 `진행 후`의 개수를 나타냅니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/4fe0969c-4bb7-4970-9544-cb903f2445c9"/>

<br/>

#### Task 정렬 및 필터링

- 마감기한이 빠른 날짜순으로 Task 정렬이 가능합니다.

<img width="20%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a585d784-6275-42a5-a8ce-d5962ea7d186"/>

<br/>

- Task의 상태를 기준으로 필터링이 가능합니다.

<img width="20%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/07f6d88f-3b2f-4ad0-ae50-22a5cbed03b2"/>

<br/>


### 칸반보드

#### Task가 없는 칸반보드

- Task가 없는 칸반보드의 화면입니다.

<img width="85%" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/ab08f690-18e0-4aad-a5a9-598a6742f083"/>

<br/>

#### Task 생성 후<br>

- Task가 작성되면 칸반보드에 Task가 생기며 Drag&Drop으로 Task의 상태 변경이 가능합니다.
- Task의 상태에 따라 진행률이 실시간으로 변경됩니다.

<video src="https://github.com/GAK-coding/UpLog-frontEnd/assets/86971770/177738c8-5a3b-4c7a-8ae0-86f65fc7cd95"></video>

<br/><br/>

## 다크모드 지원
- 사용자의 편의를 위해 라이트모드와 다크모드를 지원합니다.

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/e99f4ef1-6919-40ef-8846-ffe3fcf8ff48"/>

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/c3b74c6c-d4a2-462b-a629-d7d8ecd6fdfb"/>


<br/><br/>

<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/32e3d49e-2180-4e09-af29-589829ca0b65"/>
<img width="85%" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/209fad0a-8432-409f-b236-fd67d60e2569"/>

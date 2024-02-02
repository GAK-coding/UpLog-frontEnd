# UpLog
기업, 개발자, 의뢰인이 소통할 수 있는 릴리즈 노트 공유 시스템을 개발하였습니다. 현재 리팩터링을 진행하고 있습니다. 이 프로젝트는 개발을 시작하기 전에 2주 동안 프로젝트의 컨셉과 UI를 설계하고 개발을 시작했습니다.

<br/>

### 👥  참여인원
- 가천대학교 컴퓨터공학과 권오현 [Gitgub](https://github.com/5hyun) | qhslsl@gmail.com

- 가천대학교 소프트웨어학과 오채영 [Gitgub](https://github.com/CHCHAENG) | oco6029@naver.com

<br/>

## 프로젝트 설명

<img width="844" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e2579bed-63f8-4c45-8fd7-19fa9113270b">


## 권한과 역할 정의
### 권한
<img width="892" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a91615b5-034c-4b6b-a504-f7133460f570">

### 역할
<img width="986" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/93ded869-abe9-46cc-9c61-38aa9ab66cdb">
<img width="990" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/20f5f900-3cfb-40ce-89b6-1c3243d4539c">
<img width="990" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/44920092-44b9-4625-a2f3-36b21045c842">
<img width="1007" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/35db4c05-a0d1-43fd-8d6d-0093c9900660">

## 🎯 기술 스택
yarn berry<br/> 
vite<br/>
React<br/>
TypeScript<br/>
Recoil<br/>
React Query<br/>
Tailwind CSS<br/>
Jest

<br/>

## 📝 Architecture 설계도
-Kakao I Cloud 이용<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/f045d522-e19e-4019-8bdf-e864d35b99c7)


-AWS 이용<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/1e2d8fed-3617-46b0-ad10-89a690f2cb62)

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
    - [회원정보 수정](#회원정보-수정)
    - [비밀번호 변경](#비밀번호-변 )
5. [제품](#제품)
    - [제품 생성 및 관리](#제품-생성-및-관리)
    - [프로젝트 버전과 변경이력 관리](#프로젝트-버전과-변경이력-관리)
    - [제품 멤버 관리](#제품-멤버-관리)
6. [프로젝트](#프로젝트)
   - [그룹 관리](#그룹-관리)
   - [칸반보드](#칸반보드)
   - [Post](#Post)
   - [Task](#Task)
<br/>
<br/>

## 메인페이지
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e02cf24a-a70b-4b72-a7a5-8911eaab2cac)

## 회원가입
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/64392fe6-9282-45f2-8a1a-639095ef36e4)

- 개인 회원과 기업 회원 중 선택하여 회원가입이 가능합니다.
- 이메일 인증을 하고 회원가입을 완료할 수 있습니다.

## 로그인
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/9c20638f-044f-4baa-93be-5a8be238f0a4)

- 회원가입 후 로그인이 가능합니다.

### 비밀번호 찾기
<img width="1440" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/4ed6ddce-87ff-4877-9391-498221de8122">
<img width="1436" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a348e277-98ed-40b1-bc58-ade5211c819e">

- 비밀번호를 까먹으면 이메일을 통해서 비밀번호 찾기가 가능합니다.

## 마이페이지

### 회원정보 수정
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/72f43cf5-f002-47ba-943d-bedf75a48bca)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/636382dd-480f-4432-a388-159660e105fc)

- 이름, 닉네임, 프로필 사진 수정이 가능합니다.
- 비밀번호 변경을 클릭하면 모달창이 뜹니다.
- 계정 삭제도 가능합니다.

### 비밀번호 변경
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e778d9df-b9ec-46d6-9237-110d75594ef8)

- 현재 비밀번호, 새로운 비밀번호를 입력하고 변경이 가능합니다.

## 제품

### 제품 생성 및 관리

### 프로젝트 버전과 변경이력 관리

### 제품 멤버 관리

## 프로젝트

### 그룹 관리

### 칸반보드

### Post

### Task


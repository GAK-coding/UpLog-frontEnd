# UpLog
기업, 개발자, 의뢰인이 소통할 수 있는 릴리즈 노트 공유 시스템을 개발하였습니다. 현재 리팩터링을 진행하고 있습니다. 이 프로젝트는 개발을 시작하기 전에 2주 동안 프로젝트의 컨셉과 UI를 설계하고 개발을 시작했습니다.

<br/>

### 👥  참여인원
- 가천대학교 컴퓨터공학과 권오현 [Gitgub](https://github.com/5hyun) | qhslsl@gmail.com

- 가천대학교 소프트웨어학과 오채영 [Gitgub](https://github.com/CHCHAENG) | oco6029@naver.com

<br/>

## 프로젝트 설명

<img width="844" alt="image" src="https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e2579bed-63f8-4c45-8fd7-19fa9113270b">

### 제품
- 제품은 기업이 진행하고 있는 하나의 비지니스를 의미합니다.
- 제품 안에는 여러 개의 프로젝트(버전)가 존재합니다.

### 프로젝트(버전)
- 프로젝트는 제품 안에 있는 하나의 버전을 의미합니다.
- 프로젝트 안에는 여러 개의 그룹이 존재합니다.
- 예시로 맨 처음 프로젝트의 이름을 Version 1.0.0으로 설정하고 그 안에 그룹을 생성하여 칸반보드를 이용하여 작업을 관리할 수 있습니다.
- 프로젝트의 그룹 안에는 Post와 Task가 존재합니다.

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
    - [제품 생성](#제품-생성)
    - [제품 관리](#제품-관리)
    - [프로젝트 버전과 변경이력 관리](#프로젝트-버전과-변경이력-관리)
    - [제품 멤버 관리](#제품-멤버-관리)
6. [프로젝트](#프로젝트)
   - [그룹 관리](#그룹-관리)
   - [Post](#Post)
   - [Task](#Task)
   - [칸반보드](#칸반보드)
<br/>
<br/>

## 메인페이지
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e02cf24a-a70b-4b72-a7a5-8911eaab2cac)

![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/196cd56a-fa1b-40ef-87ba-2591700f68ba)


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

### 제품 생성
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/5fd5746c-a45c-4ce3-b8c5-9976b64319c1)

- 기업 권한으로 회원가입한 회원은 제품 생성이 가능합니다.

-제품 생성 후<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/c008537b-3e5b-4f01-9faa-bec9857beea7)


### 제품 관리
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3d24b6ec-3123-4bef-b697-bd8594360491)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/55f9bae6-2f34-41ba-ba77-e700d2f73740)


### 프로젝트 버전과 변경이력 관리
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/df4a5b23-503a-4959-a2b6-5b43ec628c21)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/982aa589-9304-431f-8be6-7db434c69a20)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/341ccd57-7c43-469a-bd39-1f9ba73912a5)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/fa6131e1-1614-4f93-9360-2c51427dc0ae)


### 제품 멤버 관리

-초기 상태<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/9d97ef82-1d2d-4f69-9723-afd528c1f596)

-리더로 초대하기<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/2501230f-fa82-4d7a-a78c-607ac9e2b19a)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/cb700e51-b84c-46b0-a6c3-221e408f611d)

-일반 멤버로 초대하기<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/18230549-ff0e-4e75-9bad-73a0ceb1ed3e)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/17b2e83e-ec14-4736-8279-7b29f543d435)

-리더 권한 위임 및 방출<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/140480c1-e414-4e53-a7aa-03d49e8d26c0)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/fa3c7e49-08bf-4a2a-8584-410352422935)


## 프로젝트
-프로젝트 생성 시 첫 화면<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/ab08f690-18e0-4aad-a5a9-598a6742f083)


### 그룹 관리
-프로젝트 그룹 관리 페이지<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/efd5b6ff-6fa7-4107-8866-50364d82596b)

-그룹 생성 모달<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/424194a2-b926-4b43-95bb-b8aacf9722aa)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3a6071d2-6a97-400a-98cf-d9e397b282cf)

-제품 멤버를 프로젝트 및 프로젝트 그룹에 초대하기<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/4e8074fe-ffc3-4301-80f0-ffd524bd3309)

-생성 완료 후<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/ee7b15cf-fa54-4de8-aa13-04c5e6bbd3a3)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/77d10660-519d-4c0b-916e-1c6e49705fcd)

### Post
-Post가 없는 상태<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/1a296046-56f1-45f5-8a2b-ca25ecbafc5f)

-Post 생성 과정<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/d7ce7441-a1d1-4911-a820-e26efe5d682c)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/68f5f132-9949-4f61-9d3f-55800c3b82d7)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/33a5e9cc-6c6f-44e8-9f41-bc91d7765978)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/5b147cd3-94bb-4d90-894d-eab018971798)

-Post 생성 완료<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a733663f-495a-40b1-a3c0-d63775cc4f13)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3892ac4e-9056-4149-8a9b-12c4dcd8cfc4)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/d1f2b45a-9c97-4c44-95d9-999b7a0039c3)


### Task
-Task가 없는 상태<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/8bbe3949-7dbe-48d5-88bd-af002bfec694)

-Task 생성 과정<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/e11059af-f00b-4346-b3dc-8025671cc04a)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/93287dd7-e399-4754-9825-80d61d1ecab0)

-Task 생성 완료<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/c8e0665b-f7ab-4141-939b-6766b044ad83)

-Task 수정<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/3463e693-71a5-48f9-aeb1-940e79c8756c)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/4fe0969c-4bb7-4970-9544-cb903f2445c9)

-Task 정렬 및 필터링<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/a585d784-6275-42a5-a8ce-d5962ea7d186)
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/07f6d88f-3b2f-4ad0-ae50-22a5cbed03b2)

### 칸반보드
-Task가 없는 칸반보드<br>
![image](https://github.com/why-are-you-c0ding/project-frontend/assets/86971770/ab08f690-18e0-4aad-a5a9-598a6742f083)

-Task 생성 후<br>
![GIFMaker_me](https://github.com/GAK-coding/UpLog-frontEnd/assets/86971770/92530216-5af0-4f7e-b561-4016210de6e5)

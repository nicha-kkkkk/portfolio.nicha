# Nicha Wanwon — Portfolio

Portfolio เว็บแอปส่วนตัวของ นิชา วันวอน (หยก) นักศึกษาปี 4 สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ มหาวิทยาลัยศรีปทุม จัดทำเพื่อใช้สมัครฝึกงาน/งานสาย Full-Stack Developer

**Live URL:** _(ใส่ลิงก์ Vercel ของคุณหลัง deploy เสร็จ เช่น `https://portfolio-nicha-liart.vercel.app/`)_

---

## Features

- Hero, About, Skills, Projects, Experience, Contact ครบทุก section ตามโจทย์ assignment
- สลับภาษาไทย/อังกฤษได้ทั้งหน้าด้วยปุ่ม TH/EN
- แสดงโปรเจกต์แบบ timeline (v1.0–v3.2) เรียงตามลำดับการพัฒนาจริงตลอด 4 ปี
- โปรเจกต์ที่ไม่มี GitHub repo จะแสดงโปสเตอร์วิจัย (poster) แทน เปิดดูแบบ pop-up (lightbox) ไม่เด้งออกไปหน้าอื่น
- Responsive รองรับ Desktop / Tablet / Mobile
- Animation แบบ scroll-reveal และ micro-interaction บนปุ่ม/การ์ด/รูปโปรไฟล์

## Tech Stack

| ส่วน | เทคโนโลยี |
|---|---|
| Front-end | React, CSS (inline styled component) |
| Font | Google Fonts — Space Grotesk, Inter, IBM Plex Mono |
| Deploy | Vercel |
| AI / Vibe Coding | Claude (Anthropic) |

## Project Structure

```
├── public/
│   ├── profile.jpg              # รูปโปรไฟล์
│   └── posters/                 # โปสเตอร์โปรเจกต์ (ครอปแล้ว ไม่มีข้อมูลเพื่อนร่วมทีม)
│       ├── healthchat-poster.jpg
│       ├── parkmate-poster.jpg
│       └── iv-van-poster.jpg
├── src/
│   └── components/
│       └── Portfolio2.jsx       # คอมโพเนนต์หลักของเว็บ (โค้ด+สไตล์อยู่ในไฟล์เดียว)
└── README.md
```

## Setup & Run Locally

```bash
npm install
npm run dev
```

เปิดดูที่ `http://localhost:5173`

## Build

```bash
npm run build
```

ไฟล์ที่ build แล้วจะอยู่ในโฟลเดอร์ `dist/`

## Deploy (Vercel)

1. Push โค้ดขึ้น GitHub repo
2. ไปที่ [vercel.com](https://vercel.com) → Sign up ด้วย GitHub
3. New Project → เลือก repo นี้
4. **สำคัญ:** เปลี่ยน Application Preset เป็น **Vite** (ไม่ใช่ "Other")
5. กด Deploy รอ 1–2 นาที ได้ลิงก์ `yourname.vercel.app`

---

## Vibe Coding Process

ส่วนนี้อธิบายกระบวนการพัฒนาเว็บนี้ด้วย AI ตามที่โจทย์ assignment กำหนด

### เริ่มจากอะไร
รวบรวมข้อมูลจริงของตัวเองก่อน — CV, Transcript, Portfolio PDF (Canva) เดิม และ GitHub profile แล้วนำมาให้ AI (Claude) วิเคราะห์และสรุปเป็นข้อมูลตั้งต้นสำหรับสร้างเว็บ

### Prompt สำคัญ
- Prompt แรก: บอก context ว่าเป็นนักศึกษาปี 4 กำลังสมัคร Full-Stack Developer มี CV และโปรเจกต์ 5–6 ชิ้น ขอให้ AI ออกแบบ Information Architecture ของเว็บก่อน ยังไม่ต้องเขียนโค้ดทันที
- Prompt ปรับดีไซน์: ระบุความชอบส่วนตัวชัดเจน เช่น "ชอบมินิมอล ไม่ชอบพื้นหลังดำอ่านยาก" → "ขอโทนขาว ฟ้า ชมพู สีอ่อนๆ"
- Prompt เพิ่มฟีเจอร์: ขอปุ่มสลับภาษา TH/EN, ขอเวอร์ชันที่มีอนิเมชันมากขึ้นแยกไฟล์ต่างหาก (Portfolio2) แต่ให้ใช้ข้อมูลชุดเดิม

### AI ช่วยอะไร
- สร้างโครงสร้างหน้าเว็บ (Hero → About → Skills → Projects → Experience → Contact)
- แปลงเนื้อหาเป็น React component พร้อมระบบสองภาษา
- เขียน CSS/animation (scroll-reveal, hover effect, lightbox popup)
- แปลเนื้อหาไทย ↔ อังกฤษให้ครบทุก section

### เจอปัญหาอะไรบ้าง และแก้อย่างไร
1. **โปรเจกต์บางอันไม่มี GitHub repo เก็บไว้แล้ว** (ParkMate, IV VAN) → แก้โดยใช้โปสเตอร์นำเสนอโปรเจกต์ (ที่เคยทำส่งอาจารย์) เป็นหลักฐานแทน แต่ต้อง **ครอปรูปตัดชื่อ-รหัสนักศึกษาของเพื่อนร่วมทีมออกก่อน** เพื่อความเป็นส่วนตัวของเพื่อน เนื่องจากเป็น portfolio ส่วนตัว
2. **ชื่อ Hero ตกบรรทัดเมื่อมีรูปโปรไฟล์ข้างๆ** เพราะพื้นที่ข้อความแคบลง → แก้ด้วย `white-space: nowrap` และปรับสัดส่วนคอลัมน์ให้ข้อความมีที่มากขึ้น
3. **ปุ่มสลับภาษาไม่ครอบคลุมทุกจุด** เช่น ชื่อ-นามสกุลและ nav bar ยังเป็นภาษาไทยค้างตอนกด EN → ตรวจสอบและผูกทุก element ที่เป็นข้อความเข้ากับระบบแปลภาษาให้ครบ
4. **ESLint เตือน `react/prop-types`** ที่ component `Reveal` เพราะไม่ได้ประกาศ type ของ props → เพิ่ม `// eslint-disable-next-line react/prop-types` (เป็น warning ไม่ใช่ error ที่กระทบการทำงาน)
5. **Deploy ครั้งแรกบน Vercel เลือก Application Preset ผิด** (ขึ้นเป็น "Other") → เปลี่ยนเป็น "Vite" ให้ตรงกับเครื่องมือที่ใช้จริง ก่อน build

### ส่วนที่ปรับ/ตัดสินใจเอง (ไม่ใช่ AI generate อย่างเดียว)
- เลือกโทนสีและคอนเซปต์ดีไซน์เองจากตัวเลือกที่ AI เสนอ (ปฏิเสธธีมดำ, เลือกพาสเทลฟ้า-ชมพู)
- ตัดสินใจลบโปรเจกต์ Tree Heart ออกเพราะไม่มีหลักฐาน/repo เก็บไว้ ไม่อยากใส่ข้อมูลที่ยืนยันไม่ได้
- ตัดสินใจเรื่องความเป็นส่วนตัวของเพื่อนร่วมทีมในโปสเตอร์ ก่อนนำขึ้นเว็บสาธารณะ
- เลือกใช้ layout timeline (build-log) แทนแบบการ์ดเอียง เพราะรู้สึกว่าอ่านง่ายและดูเป็นมืออาชีพกว่าสำหรับ recruiter

### สิ่งที่เรียนรู้ / จะปรับต่อ
- การทำงานกับ AI ต้องให้ context และ constraint ที่ชัดเจนตั้งแต่ต้น (audience, goal, content) ถึงจะได้ผลลัพธ์ตรงใจเร็วขึ้น
- ต้องตรวจสอบเนื้อหาที่ AI generate ทุกครั้งก่อนเผยแพร่จริง โดยเฉพาะเรื่องความเป็นส่วนตัวของบุคคลอื่น
- ขั้นต่อไปคือหา repo ของ ParkMate เพิ่ม และเพิ่มปุ่มดาวน์โหลด CV ในหน้าเว็บ

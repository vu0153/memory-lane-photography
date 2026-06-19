# Memory Lane Photo Studio - Website Technology & Launch Overview

**Website:** https://memorylaneadelaide.com  
**Brand hiện tại:** Memory Lane Photo Studio  
**Mục tiêu website:** Giới thiệu dịch vụ chụp ảnh gia đình, cặp đôi, chân dung và sự kiện nhỏ tại Adelaide; cho khách xem dịch vụ, giá, gallery, bài viết tư vấn và gửi booking enquiry.

---

## 1. Tóm tắt đơn giản

Website Memory Lane Photo Studio được xây dựng theo mô hình hiện đại nhưng vẫn đơn giản:

- **Cloudflare Pages** dùng để host website, giúp khách truy cập nhanh, có HTTPS/SSL và không cần dùng NAS tại nhà.
- **Tên miền `memorylaneadelaide.com`** là địa chỉ chính thức để khách hàng truy cập website.
- **GitHub** lưu source code website và tự động kết nối với Cloudflare để deploy khi có cập nhật.
- **Supabase** lưu dữ liệu động của website như booking, gallery, bài viết Helpful Advice và hình ảnh quản lý từ admin dashboard.
- **Resend** gửi email thông báo khi có khách gửi booking form.
- **Google Search Console** giúp Google biết website mới, kiểm tra khả năng index và submit sitemap.

Nói ngắn gọn:

> Khách vào `memorylaneadelaide.com`, Cloudflare hiển thị website, website lấy dữ liệu từ Supabase, và khi khách gửi booking thì Supabase/Resend gửi email thông báo.

---

## 2. Tại sao không tiếp tục host trên NAS?

Ban đầu website được host từ NAS với địa chỉ dạng:

```text
https://marklong.mycloudnas.com:8091
```

Cách này chạy được nhưng có nhiều điểm không phù hợp cho website khách hàng:

| Vấn đề | Ảnh hưởng |
|---|---|
| Phải thêm `:8091` vào URL | Nhìn không chuyên nghiệp, khó nhớ |
| Trình duyệt cảnh báo không an toàn | Khách dễ mất tin tưởng |
| Cần reverse proxy và SSL certificate riêng | Cấu hình phức tạp |
| Có thể phải thay đổi port quản trị QNAP | Có nguy cơ ảnh hưởng dịch vụ khác trên NAS |
| Mở NAS ra internet | Tăng rủi ro bảo mật |
| Social preview và Google index dễ lỗi | Ảnh hưởng chia sẻ link và SEO |

Vì vậy, website đã được chuyển sang Cloudflare Pages để có địa chỉ chuyên nghiệp hơn:

```text
https://memorylaneadelaide.com
```

---

## 3. Tên miền là gì và mình đã làm gì?

### Tên miền là gì?

Tên miền là địa chỉ dễ nhớ của website. Thay vì khách phải truy cập một địa chỉ kỹ thuật dài hoặc có port, họ chỉ cần vào:

```text
memorylaneadelaide.com
```

### Mình đã làm gì?

1. Mua tên miền `memorylaneadelaide.com` qua Mắt Bão.
2. Đưa tên miền vào Cloudflare.
3. Đổi nameserver tại Mắt Bão sang nameserver của Cloudflare:

```text
dalary.ns.cloudflare.com
keenan.ns.cloudflare.com
```

### Mục đích

Việc đổi nameserver giúp Cloudflare quản lý DNS của domain. Nhờ đó Cloudflare có thể:

- Trỏ domain về website trên Cloudflare Pages.
- Tự cấp SSL/HTTPS.
- Tăng tốc truy cập nhờ CDN.
- Quản lý các record DNS như Google Search Console verification.

---

## 4. Cloudflare là gì và dùng để làm gì?

Cloudflare trong website này có 3 vai trò chính:

### 4.1. DNS

DNS giống như “danh bạ internet”. Khi khách nhập:

```text
memorylaneadelaide.com
```

DNS sẽ chỉ trình duyệt đến đúng nơi đang host website.

### 4.2. Hosting bằng Cloudflare Pages

Cloudflare Pages là nơi chứa các file website tĩnh như:

```text
index.html
css/style.css
js/main.js
assets/logo
assets/images
admin.html
```

Website Memory Lane Photo Studio là website HTML/CSS/JavaScript tĩnh, nên rất phù hợp với Cloudflare Pages.

### 4.3. HTTPS/SSL

Cloudflare cung cấp HTTPS/SSL cho domain, giúp trình duyệt hiện ổ khóa bảo mật và không còn cảnh báo “Not Secure”.

### Mục đích dùng Cloudflare

- Không cần host trên NAS.
- Không cần mở port router.
- Không cần `:8091`.
- Tự có HTTPS/SSL.
- Website load nhanh hơn.
- Dễ deploy qua GitHub.
- Giảm rủi ro bảo mật cho NAS.

---

## 5. GitHub là gì và dùng để làm gì?

GitHub là nơi lưu source code của website.

Trong dự án này, GitHub giữ các file như:

```text
index.html
admin.html
css/style.css
js/main.js
js/admin.js
js/supabase.js
assets/
docs/
```

### Mục đích dùng GitHub

- Lưu lịch sử thay đổi của website.
- Cho phép quay lại phiên bản cũ nếu có lỗi.
- Kết nối với Cloudflare Pages để tự động deploy.

Luồng cập nhật website hiện tại:

```text
Sửa code trên máy
→ git commit
→ git push lên GitHub
→ Cloudflare Pages tự deploy
→ Website public được cập nhật
```

---

## 6. Cloudflare Pages deploy hoạt động như thế nào?

Website đã được deploy bằng Cloudflare Pages thông qua GitHub.

Khi project được kết nối, Cloudflare sẽ lấy source từ GitHub repository:

```text
memory-lane-photography
```

Sau đó deploy lên địa chỉ tạm:

```text
memory-lane-photography.pages.dev
```

Rồi gắn domain chính thức:

```text
memorylaneadelaide.com
```

### Cấu hình build đã dùng

Vì website là HTML/CSS/JS tĩnh nên không cần build framework.

```text
Framework preset: None
Build command: exit 0
Build output directory: /
Production branch: main
```

### Lỗi đã gặp và đã xử lý

Cloudflare Pages báo lỗi vì file ảnh quá lớn:

```text
assets/images/hero-3.jpg = 33.1 MiB
```

Cloudflare Pages chỉ hỗ trợ file static asset tối đa 25 MiB, nên các ảnh hero cũ không còn dùng đã được xoá. Website hiện giữ lại ảnh hero đang dùng:

```text
assets/images/hero-photographer-duo.png
```

### Mục đích

Việc xoá ảnh cũ giúp:

- Deploy thành công trên Cloudflare Pages.
- Repository nhẹ hơn.
- Website tải nhanh hơn.
- Tránh lỗi file quá lớn trong tương lai.

---

## 7. Supabase là gì và website dùng Supabase để làm gì?

Supabase là backend cho website. Có thể hiểu đơn giản là nơi lưu dữ liệu và xử lý một số tác vụ phía sau website.

Trong dự án Memory Lane Photo Studio, Supabase dùng cho:

### 7.1. Database

Database lưu dữ liệu như:

| Bảng | Mục đích |
|---|---|
| `bookings` | Lưu enquiry từ khách gửi qua booking form |
| `blog_posts` | Lưu bài viết Helpful Advice |
| `gallery_images` | Lưu thông tin ảnh gallery |
| `hero_images` | Lưu ảnh slider/services showcase nếu dùng từ admin |

### 7.2. Storage

Storage dùng để lưu file ảnh upload từ Admin Dashboard, ví dụ:

- Ảnh bài viết Helpful Advice.
- Ảnh gallery.
- Ảnh hero/services slider.

### 7.3. Edge Function

Supabase Edge Function được dùng để xử lý việc gửi email booking notification.

Function chính:

```text
send-booking-email
```

### Mục đích dùng Supabase

- Website có dữ liệu động dù frontend là website tĩnh.
- Admin Dashboard có thể thêm/sửa booking, gallery và bài viết.
- Không cần tự xây server riêng.
- Dữ liệu được quản lý tập trung trên Supabase.

---

## 8. Resend là gì và dùng để làm gì?

Resend là dịch vụ gửi email qua API.

Trong website này, Resend dùng để gửi thông báo khi khách điền booking form.

Luồng hoạt động:

```text
Khách gửi booking form
→ Dữ liệu được lưu vào Supabase
→ Supabase Edge Function được gọi
→ Edge Function gọi Resend API
→ Email thông báo gửi đến Gmail
```

### Mục đích dùng Resend

- Tự động nhận email khi có khách đặt lịch.
- Không cần kiểm tra database thủ công liên tục.
- Giúp phản hồi khách nhanh hơn.
- API key của Resend được lưu ở Supabase secret, không đặt trực tiếp trong website public.

---

## 9. Admin Dashboard dùng để làm gì?

Admin Dashboard là trang quản trị riêng của website.

Đường dẫn:

```text
https://memorylaneadelaide.com/admin.html
```

Admin Dashboard giúp quản lý:

- Booking enquiries.
- Helpful Advice posts.
- Gallery images.
- Hero/services slider images.
- Trạng thái booking.
- Thống kê cơ bản như booking và doanh thu nếu có dữ liệu.

### Mục đích

Admin Dashboard giúp người không chuyên code vẫn có thể cập nhật nội dung website mà không cần sửa file HTML trực tiếp.

---

## 10. Google Search Console là gì và đã làm gì?

Google Search Console là công cụ của Google để chủ website kiểm tra Google có thể tìm, đọc và index website hay không.

Các bước đã làm:

1. Thêm domain `memorylaneadelaide.com` vào Google Search Console.
2. Xác minh domain bằng DNS TXT record trong Cloudflare.
3. Kiểm tra URL bằng URL Inspection.
4. Request indexing cho trang chủ.
5. Tạo `sitemap.xml`.
6. Tạo `robots.txt`.
7. Submit sitemap cho Google.

### Mục đích

- Cho Google biết website mới tồn tại.
- Giúp Google index đúng domain chính thức.
- Tránh Google index nhầm link NAS cũ hoặc link Cloudflare tạm.
- Kiểm tra website có bị chặn crawl không.

---

## 11. Sitemap, robots.txt và canonical URL là gì?

### 11.1. `sitemap.xml`

Sitemap là bản đồ website cho Google.

File hiện tại:

```text
https://memorylaneadelaide.com/sitemap.xml
```

Mục đích:

- Báo cho Google biết URL chính của website.
- Hỗ trợ Google crawl website nhanh và chính xác hơn.

### 11.2. `robots.txt`

Robots.txt là file hướng dẫn crawler như Googlebot.

File hiện tại:

```text
https://memorylaneadelaide.com/robots.txt
```

Nội dung chính:

```text
User-agent: *
Allow: /

Sitemap: https://memorylaneadelaide.com/sitemap.xml
```

Mục đích:

- Cho phép crawler đọc website.
- Chỉ cho crawler biết sitemap nằm ở đâu.

### 11.3. Canonical URL

Canonical URL trong `index.html` là:

```html
<link rel="canonical" href="https://memorylaneadelaide.com/">
```

Mục đích:

- Nói với Google rằng domain chính thức là `memorylaneadelaide.com`.
- Tránh việc Google xem `pages.dev`, `www`, hoặc link NAS cũ là bản chính.

---

## 12. Social preview và Open Graph là gì?

Social preview là phần hiển thị khi gửi link website qua:

- Facebook.
- Messenger.
- Zalo.
- LinkedIn.
- iMessage.

Nó thường gồm:

- Tiêu đề.
- Mô tả ngắn.
- Ảnh preview.
- Domain.

Website đã cấu hình Open Graph metadata trong `index.html`, ví dụ:

```html
<meta property="og:title" content="Memory Lane Photo Studio | Family & Couple Photography Adelaide">
<meta property="og:description" content="Relaxed family, couple, portrait and small event photography in Adelaide, South Australia.">
<meta property="og:image" content="https://memorylaneadelaide.com/assets/brand/og-image-memory-lane-adelaide.png">
```

### Lỗi đã gặp

Ban đầu ảnh preview không hiện vì metadata trỏ tới file `.jpg` nhưng file thực tế là `.png`.

Sau đó đã đổi sang ảnh mới:

```text
assets/brand/og-image-memory-lane-adelaide.png
```

và thêm metadata:

```html
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### Mục đích

- Khi chia sẻ link, website nhìn chuyên nghiệp hơn.
- Giảm khả năng Facebook/Messenger lấy nhầm ảnh hoặc không hiện ảnh.
- Giúp thương hiệu hiển thị đúng tên mới.

---

## 13. Vì sao đổi tên brand thành Memory Lane Photo Studio?

Ban đầu website dùng tên gần với:

```text
Memory Lane Photography Adelaide
```

Sau khi kiểm tra, phát hiện có một đơn vị khác tại Adelaide dùng thương hiệu gần giống trong mảng wedding/events.

Để giảm nhầm lẫn, website giữ domain:

```text
memorylaneadelaide.com
```

nhưng đổi brand public thành:

```text
Memory Lane Photo Studio
```

### Mục đích

- Khác biệt hơn với đối thủ đang dùng “Memory Lane Adelaide” trên mạng xã hội.
- Vẫn giữ được domain đã mua.
- Tên nghe tự nhiên, dễ hiểu và không tạo cảm giác pháp lý như “Company”.
- Rõ ràng đây là studio chụp ảnh, không phải event styling hoặc wedding planning.

### Gợi ý tên social media

Nên dùng:

```text
@memorylanephotoadelaide
```

Không nên dùng:

```text
@memorylaneadelaide
```

vì dễ bị nhầm với đơn vị khác.

---

## 14. Các file chính trong website

| File / Folder | Mục đích |
|---|---|
| `index.html` | Trang chính của website |
| `aboutus.html` | Trang About Us riêng giới thiệu Ricky Vu, Mark Lee và sứ mệnh cộng đồng |
| `admin.html` | Trang admin dashboard |
| `css/style.css` | Giao diện, màu sắc, layout, responsive |
| `js/main.js` | Logic frontend cho trang chính |
| `js/admin.js` | Logic cho admin dashboard |
| `js/supabase.js` | Cấu hình kết nối Supabase bằng public anon key |
| `assets/logo/` | Logo website |
| `assets/brand/` | Favicon, social preview image |
| `assets/images/` | Ảnh dùng trực tiếp trong website |
| `sitemap.xml` | Sitemap cho Google |
| `robots.txt` | Hướng dẫn crawler và link tới sitemap |
| `docs/` | Tài liệu launch/checklist nội bộ |

---

## 15. Mô hình kết nối tổng thể

### 15.1. Mô hình đơn giản cho người không chuyên

```text
Khách truy cập website
        |
        v
memorylaneadelaide.com
        |
        v
Cloudflare
- Quản lý DNS
- Cấp HTTPS/SSL
- Host website bằng Cloudflare Pages
        |
        v
Website Memory Lane Photo Studio
- Home
- Services
- Pricing
- Gallery
- Helpful Advice
- Booking Form
- Admin Dashboard
        |
        +-----------------------------+
        |                             |
        v                             v
Supabase Database              Supabase Storage
- Booking enquiries            - Gallery images
- Blog posts                   - Blog images
- Gallery records              - Hero/service images
- Hero image records
        |
        v
Supabase Edge Function
send-booking-email
        |
        v
Resend Email API
        |
        v
Email thông báo gửi về Gmail
```

---

### 15.2. Mô hình cập nhật website

```text
Người quản trị sửa source code trên máy
        |
        v
git commit / git push
        |
        v
GitHub Repository
memory-lane-photography
        |
        v
Cloudflare Pages tự động deploy
        |
        v
Website public được cập nhật
https://memorylaneadelaide.com
```

---

### 15.3. Mô hình booking form

```text
Khách điền booking form
        |
        v
Website gửi dữ liệu đến Supabase
        |
        v
Supabase lưu booking vào bảng bookings
        |
        v
Supabase Edge Function được gọi
        |
        v
Resend gửi email thông báo
        |
        v
Ricky/Mark nhận email và phản hồi khách
```

---

### 15.4. Mô hình admin dashboard

```text
Người quản trị mở admin.html
        |
        v
Admin Dashboard kết nối Supabase
        |
        +-----------------------------+
        |                             |
        v                             v
Quản lý dữ liệu                 Quản lý hình ảnh
- Bookings                      - Upload gallery images
- Blog posts                    - Upload advice images
- Hero images                   - Upload hero/service images
        |
        v
Website public tự hiển thị dữ liệu mới
```

---

## 16. Tóm tắt các bước đã làm từ đầu đến hiện tại

| Giai đoạn | Việc đã làm | Mục đích |
|---|---|---|
| 1 | Xây dựng website HTML/CSS/JS | Có trang giới thiệu dịch vụ chụp ảnh |
| 2 | Thêm booking form | Cho khách gửi enquiry |
| 3 | Kết nối Supabase | Lưu booking và dữ liệu động |
| 4 | Tạo Admin Dashboard | Quản lý booking, gallery, bài viết và hero images |
| 5 | Kết nối Resend qua Supabase Edge Function | Gửi email thông báo booking |
| 6 | Hoàn thiện nội dung website | Làm website rõ ràng, chuyên nghiệp hơn |
| 7 | Cập nhật pricing | Phù hợp thị trường Adelaide và người mới bắt đầu |
| 8 | Host thử trên NAS | Kiểm tra website public ban đầu |
| 9 | Phát hiện vấn đề NAS/port/SSL | Quyết định chuyển sang hosting chuyên nghiệp hơn |
| 10 | Mua domain `memorylaneadelaide.com` | Có địa chỉ thương hiệu riêng |
| 11 | Đưa domain vào Cloudflare | Quản lý DNS, SSL và hosting dễ hơn |
| 12 | Deploy website lên Cloudflare Pages | Website chạy nhanh, có HTTPS, không cần NAS |
| 13 | Gắn custom domain | Khách truy cập bằng domain chính thức |
| 14 | Tạo `sitemap.xml` và `robots.txt` | Hỗ trợ Google crawl/index |
| 15 | Xác minh Google Search Console | Cho Google biết website chính thức |
| 16 | Sửa canonical và social preview | Tránh index nhầm link cũ, chia sẻ link đẹp hơn |
| 17 | Đổi brand thành Memory Lane Photo Studio | Giảm nhầm lẫn với thương hiệu khác tại Adelaide |

---

## 17. Trạng thái hiện tại

Website hiện đã có:

- Domain chính thức: `memorylaneadelaide.com`
- Hosting trên Cloudflare Pages
- HTTPS/SSL qua Cloudflare
- GitHub auto deploy
- Supabase database/backend
- Resend email notification
- Admin Dashboard
- Sitemap và robots.txt
- Google Search Console verification
- Brand mới: Memory Lane Photo Studio

Website đã sẵn sàng cho giai đoạn tiếp theo:

- Tạo Facebook Page.
- Tạo Instagram/TikTok với handle khác biệt.
- Chạy Google Business Profile.
- Theo dõi Google Search Console.
- Thêm Google Analytics nếu muốn đo traffic.
- Tiếp tục upload ảnh thật và bài viết Helpful Advice.

---

## 18. Gợi ý giới thiệu ngắn cho người không chuyên

> Memory Lane Photo Studio là website chụp ảnh gia đình, cặp đôi, chân dung và sự kiện nhỏ tại Adelaide. Website được host trên Cloudflare để truy cập nhanh và bảo mật bằng HTTPS. Dữ liệu booking, gallery và bài viết được quản lý qua Supabase, còn email booking được gửi tự động bằng Resend. Source code được lưu trên GitHub và mỗi lần cập nhật code, Cloudflare tự động deploy phiên bản mới. Nhờ vậy website không phụ thuộc vào NAS tại nhà, không cần port lạ, dễ quản lý và chuyên nghiệp hơn cho khách hàng.

---

## 19. Tài liệu tham khảo chính

- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/
- Cloudflare SSL/TLS: https://developers.cloudflare.com/ssl/
- Supabase: https://supabase.com/docs
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Resend Email API: https://resend.com/docs/api-reference/emails/send-email
- Google Search Console: https://search.google.com/search-console
- Google sitemap documentation: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Open Graph protocol: https://ogp.me/


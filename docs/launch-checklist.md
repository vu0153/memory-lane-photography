# Memory Lane Launch Readiness Notes

Last updated: 05 June 2026

## 1. Website status

The Memory Lane website is ready for final pre-launch testing.

Current key features:

- Public landing page
- Static hero section with photographer duo image
- Services section with four service groups
- Services photo slider managed through Admin Hero images
- Pricing section with introductory Adelaide prices
- Gallery section with five categories
- Gallery modal and full image viewer
- Helpful Advice section with three articles
- Booking enquiry form
- Supabase booking storage
- Email notification flow
- Admin dashboard for bookings, gallery, hero images and advice posts
- Mobile responsive layout
- Favicon and social preview metadata

## 2. Important URLs

Replace these if the final public domain changes.

- Website URL: `https://marklong.mycloudnas.com:8091/`
- Admin URL: `https://marklong.mycloudnas.com:8091/admin.html`
- Local website: `http://127.0.0.1:5500/index.html`
- Local admin: `http://127.0.0.1:5500/admin.html`

## 3. Git workflow before launch

Before every major change:

```bash
git status
git add .
git commit -m "Describe the change"
git push
git status
```

Expected final status:

```text
nothing to commit, working tree clean
```

Recommended launch commit message:

```bash
git commit -m "Prepare Memory Lane website for launch"
```

## 4. Supabase setup notes

Do not store secret keys in this file.

### Tables

The website currently relies on these Supabase tables:

- `bookings`
- `gallery_images`
- `hero_images`
- `blog_posts`

### Storage buckets

The project may use these storage buckets:

- `gallery-images`
- `hero-images`
- `advice-images`

### Auth

Admin Dashboard access uses Supabase Auth.

Before launch, confirm:

- Admin login works
- Only approved admin users can log in
- Public visitors cannot access private Supabase actions
- Row Level Security policies are active and correct

### Email flow

Booking enquiry email notifications are handled through Supabase and Resend.

Before launch, confirm:

- Booking form inserts into `bookings`
- Email notification is sent after a new enquiry
- Email arrives in the correct inbox
- Sender name and subject line are clear
- Failed email sends are visible in logs

## 5. Public website final QA

Test the public website from the top of the page to the bottom.

### Header

- Logo displays correctly
- Desktop navigation links work
- Mobile header displays correctly
- Book Now scrolls to the booking form
- No horizontal scroll on mobile

### Hero section

- Hero text is clear and readable
- Static photographer duo image loads correctly
- Hero image size works on desktop
- Hero image size works on mobile
- Buttons work:
  - View Packages
  - See Recent Work

### Services section

- Four service groups display correctly:
  - Family Sessions
  - Couple Sessions
  - Friends & Memories
  - Portraits & Small Events
- Cards form a 2 by 2 layout on desktop where intended
- Services slider appears on the right
- Services slider loads images from `hero_images`
- Slider changes images automatically
- Mobile layout stacks cleanly

### Pricing section

Confirm pricing is correct:

- Mini Memory Session: A$250
- Family or Couple Session: A$350 introductory price
- Signature Story Session: A$550 introductory price
- Small Event Coverage: From A$390 for the first 2 hours, then A$180/hr

Check:

- Each package explains what is included
- Enquire Now buttons scroll to the booking form
- Mobile pricing cards are readable

### Gallery section

Confirm gallery categories:

- Family
- Couple
- Friends
- Portrait
- Event

Check:

- Each category has the correct cover image
- Each category opens the gallery modal
- Mobile modal thumbnails do not overlap
- Images are evenly spaced
- Full image viewer opens when tapping an image
- Full image viewer closes correctly
- Left and right controls work
- Escape key closes the modal on desktop

### Helpful Advice section

Confirm the three live articles:

- What to Wear for a Family or Couple Photoshoot in Adelaide
- Best Adelaide Photo Locations for Natural Family and Couple Photos
- How to Feel Natural in Front of the Camera

Check:

- Articles show in the right order
- Thumbnails load correctly
- Read More opens the article popup
- Article content is readable on desktop
- Article content is readable on mobile
- Embedded article images display correctly if added
- Popup closes by using the X button

### What to expect section

Check:

- Content feels honest and not fake
- It does not imply fake customer reviews
- The section builds trust before booking

### Booking form

Submit a test enquiry.

Test data:

```text
Name: Launch Test
Phone: 0492 000 000
Email: test@example.com
Service: Family Session
Date: Choose any future date
Message: Launch test enquiry. Please ignore.
```

Confirm:

- Required validation works
- Success message appears
- Booking appears in Admin Dashboard
- Booking appears in Supabase `bookings`
- Email notification is received
- Form clears after successful submit
- Mobile form is easy to use

### Footer

Check:

- Contact details match the main Contact section
- Phone numbers are correct
- Email address is correct
- Copyright year is correct
- Footer links work

## 6. Admin Dashboard final QA

Open `admin.html` and test each area.

### Login

- Admin login works
- Invalid login fails
- Logout works
- Mobile admin layout is usable

### Bookings

- New bookings load
- Booking details open
- Status can be updated
- Quoted price can be saved
- Notes can be saved if available
- Changes persist after refresh

### Gallery Manager

- New Gallery Image opens the popup
- Image upload works
- Category dropdown works
- Caption and alt text save correctly
- Cover image setting works
- Visibility setting works
- Sort order works
- Edit works
- Delete works
- Public gallery updates after refresh

### Hero Manager

Hero images now control the Services slider.

Check:

- New Hero Image opens the popup
- Upload works
- Active checkbox works
- Sort order works
- Edit works
- Delete works
- Services slider updates after refresh

### Helpful Advice Manager

- New Post opens the popup
- Edit Post opens the popup
- Title saves correctly
- Slug saves correctly
- Excerpt saves correctly
- Content saves correctly
- Thumbnail saves correctly
- Published status works
- Sort order works
- Public Helpful Advice section updates after refresh

## 7. SEO and sharing checklist

### Browser and search basics

Check in `index.html`:

- Page title is correct
- Meta description is correct
- Canonical URL is correct
- Favicon loads correctly
- Images have useful alt text where practical

### Social preview

Current social preview image path:

```text
/assets/brand/og-image.jpg
```

Current social image absolute URL:

```text
https://marklong.mycloudnas.com:8091/assets/brand/og-image.jpg
```

Check social preview with:

- Messenger
- Facebook Sharing Debugger
- Zalo
- iMessage if available
- Discord if available

If the image does not appear, check:

- The image URL opens directly in a browser
- The image uses HTTPS
- The server allows bot access
- The image is not blocked by NAS/firewall settings
- The image is around 1200 by 630 pixels

## 8. Performance checklist

Before launch, check:

- Hero image file size is reasonable
- Gallery images are not unnecessarily huge
- OG image is compressed
- Website loads acceptably on mobile data
- No broken image links in browser console
- No JavaScript errors in browser console

Recommended image guidance:

- Hero/static assets: use compressed PNG or WebP where practical
- Gallery images: resize before upload when possible
- OG image: 1200 by 630 JPG, compressed

## 9. Content checklist

Read the website as a customer.

Confirm:

- The offer is clear within the first screen
- Adelaide location is clear
- Services are clear
- Pricing is clear
- The booking step is easy to understand
- There is no placeholder content
- There are no fake reviews presented as real reviews
- Contact details are correct everywhere
- Spelling and grammar are clean

## 10. Backup checklist

Keep a backup of:

- GitHub repository
- Supabase table structure
- Supabase RLS policies
- Supabase storage bucket names
- Supabase Edge Function code if used
- Resend setup notes
- Admin login recovery method
- Logo files
- Hero photographer duo PNG
- OG image
- Gallery source images

Do not store API secret keys in GitHub or this notes file.

## 11. Launch day checklist

On launch day:

- Pull latest code
- Confirm `git status` is clean
- Open website in Chrome
- Open website in Safari if available
- Open website on mobile
- Submit one real test booking
- Confirm email notification arrives
- Delete or mark the test booking in Admin
- Check public Gallery
- Check public Helpful Advice articles
- Check Admin Dashboard login
- Check social preview if sharing the link

## 12. Post-launch tasks

After launch:

- Add real client reviews when available
- Replace any stock or placeholder images with original work
- Add more Helpful Advice articles over time
- Review pricing after 2 to 3 months
- Add Google Business Profile if not already created
- Add analytics if needed
- Consider a custom domain on standard HTTPS port 443
- Review mobile experience after real users test it

## 13. Known future improvements

These are optional. Do not block launch on these.

- Add View All Tips page
- Add individual article URLs
- Add individual gallery category URLs
- Add custom domain
- Improve social preview reliability if NAS hosting blocks bots
- Add analytics
- Add privacy policy
- Add terms or booking policy
- Add deposit/payment workflow later

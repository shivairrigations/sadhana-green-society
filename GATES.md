# GATES.md - Autonomous Completion Ledger for Sadana Green Society

## Phase 1: Completed Milestones
- [x] G1: Admin Image CRUD Server API (`POST /api/upload`, `GET /api/media`, `DELETE /api/media/:id`).
- [x] G2: Admin Portal File Upload & Binary Storage.
- [x] G3: Species Navigation Dropdown & Mobile Accordion across 19 pages.
- [x] G4: Typography & Selio Microinteractions.
- [x] G5: Real SGS NGO Content, Gallery Lightbox, Farmer GPS Registration.
- [x] G6: Milestone 1 Test Suite (39/39 passing).

---

## Phase 2: Design Realignment, Hero Redesign & Page-Wise Admin CRUD

### Gate 7: Elimination of All Text Blur & Blurry Shadows
- [x] G7.1: Remove `text-shadow` from `.hero-title` and all headings (`h1`, `h2`, `h3`, `.section-title-twotone`, `span`).
- [x] G7.2: Verify that no content headings exhibit fuzzy or blurry dark halos.
CHECK: node scratch/check_no_text_blur.js
EXPECT: ALL_TEXT_BLUR_CLEARED

### Gate 8: Heading & Paragraph Alignment Across All Pages
- [x] G8.1: Eliminate centered/offset margins (`margin: 0 auto`) on lead paragraphs inside left-aligned page headers.
- [x] G8.2: Ensure all page headers (Home, About, Services, Agroforestry, AWD, Carbon Credits, Gallery, New Plantation, etc.) exhibit clean left-aligned or balanced 2-column layouts matching the Blocksy Landscape reference.
- [x] G8.3: Tweak heading and paragraph sizes to reference specifications.
CHECK: node scratch/check_alignment.js
EXPECT: ALL_PAGE_ALIGNMENTS_VERIFIED

### Gate 9: Hero Section Refinement
- [x] G9.1: Remove right-hand extra blocks (`FIELD TRAINING & WALKTHROUGH` video box and `Community Nursery Hub` card) from hero in `index.html`.
- [x] G9.2: Scale down hero title and lead paragraph slightly for elegant balance (`clamp(2.2rem, 4vw, 3.4rem)` and `clamp(0.95rem, 1.2vw, 1.05rem)`).
- [x] G9.3: Refine hero CTA UI: polished `.cta-pill` and clean social proof / rating element.
- [x] G9.4: Hero background image or video driven by editable CMS configuration.
CHECK: node scratch/check_hero_refinement.js
EXPECT: HERO_REFINED_CLEANLY

### Gate 10: Programmes Mega Menu Full Card Clickability
- [x] G10.1: Make the entire `.mega-soft-card` container clickable (`cursor: pointer`, onclick navigation) for Agroforestry, AWD, and Carbon Credits.
CHECK: node scratch/check_mega_menu_cards.js
EXPECT: MEGA_CARDS_FULLY_CLICKABLE

### Gate 11: Original Logo & Tagline in Navbar
- [x] G11.1: Replace generic SVG circle with original logo image (`assets/logo.png`) in navbar across all 19 customer-facing pages.
- [x] G11.2: Include brand title "Sadana Green Society" and tagline "Regd. No. 129/2021 • Kurnool".
CHECK: node scratch/check_navbar_logo.js
EXPECT: NAVBAR_ORIGINAL_LOGO_VERIFIED

### Gate 12: Floating WhatsApp CTA "Contact Us"
- [x] G12.1: Floating CTA button uses official original WhatsApp SVG icon.
- [x] G12.2: Floating CTA button text updated to "Contact Us" linking directly to `https://wa.me/919963490444`.
- [x] G12.3: Synchronized across all 19 pages.
CHECK: node scratch/check_floating_whatsapp.js
EXPECT: FLOATING_WHATSAPP_CONTACT_US_VERIFIED

### Gate 13: Mobile Viewport Zero Horizontal Overflow
- [x] G13.1: Enforce `overflow-x: hidden` and constrain all containers to `max-width: 100vw`.
- [x] G13.2: Verify mobile drawer and off-canvas elements do not cause horizontal scroll when closed.
- [x] G13.3: Verify `scrollWidth <= clientWidth` on standard mobile viewports (375px & 390px) on both public pages and admin dashboard.
CHECK: node scratch/check_mobile_overflow.js
EXPECT: ZERO_HORIZONTAL_OVERFLOW

### Gate 14: Admin Portal Page-Wise CRUD & Mobile Revamp
- [x] G14.1: Remove "Officer: ..." badge and remove "Data & Backups" tab from admin portal.
- [x] G14.2: Replace disconnected image tab with integrated Page-Wise Content & Image Editor for all pages.
- [x] G14.3: Add Hero background image upload/delete and video support in admin.
- [x] G14.4: Add direct image upload, thumbnail preview, detail editing, and physical delete buttons per section/page.
- [x] G14.5: Redesign Farmer Applications list to show applicant names initially in a compact list; clicking a name expands the complete application details and actions.
- [x] G14.6: Fix admin mobile header nav buttons so they do not extend or blow out the viewport.
CHECK: node scratch/check_admin_revamp.js
EXPECT: ADMIN_REVAMP_VERIFIED

### Gate 15: Full Verification & Live Screenshots
- [x] G15.1: Regression test suite passes 100% (39/39 tests).
- [x] G15.2: Image CRUD test suite passes 100% (6/6 tests).
- [x] G15.3: DevTools MCP screenshots verify live desktop, mega menu, mobile view, and admin portal.
CHECK: node new_website/tests/m1_test.js
EXPECT: 39/39 Passed (0 Failed)


---

## Phase 3: Comprehensive Section Editing, Email Routing & Reference Realignment

### Gate 16: Color UI & Button Parity (3rd Snip Fix)
- [x] G16.1: Dark greenhouse section (`#14221b`) heading contrast fixed: `#ffffff` title and `#a5d6a7` span.
- [x] G16.2: Action button updated to signature `.cta-pill` with white circle arrow and `#54a630` background.
CHECK: node scratch/test_all_requirements.js
EXPECT: ALL_COLOR_UI_BUTTONS_VERIFIED

### Gate 17: Layout & Alignment Rectification (1st & 2nd Snips Fix)
- [x] G17.1: "Our Impact in Verified Numbers" converted to 2-column flex layout (Left: kicker + h2; Right: narrative paragraph).
- [x] G17.2: "Visual Field Documentation" Bento heading balanced to prevent unnatural line breaks; zero text blur.
- [x] G17.3: Subpage hero banners unified left-aligned with clean Rubik typography.
CHECK: Chrome DevTools MCP inspection on Page 3
EXPECT: ZERO_MISALIGNMENT

### Gate 18: Email Routing to info@sadhanagreensociety.com
- [x] G18.1: `POST /api/farmers` automatically forwards full applicant dossier to `info@sadhanagreensociety.com`.
- [x] G18.2: `POST /api/contact` and `POST /api/query` record inquiries and dispatch notifications to `info@sadhanagreensociety.com`.
- [x] G18.3: `GET /api/notifications` provides audit trail of all dispatched emails.
CHECK: node scratch/test_all_requirements.js
EXPECT: DISPATCH_CONFIRMED_TO_INFO_SADHANAGREENSOCIETY

### Gate 19: Hero Video Upload Support
- [x] G19.1: `POST /api/upload` accepts MP4/WebM video files up to 50MB and streams to `uploads/`.
- [x] G19.2: Admin hero editor features `🎥 Upload .mp4` button alongside manual URL input.
CHECK: node scratch/test_all_requirements.js
EXPECT: VIDEO_UPLOAD_PASSED

### Gate 20: Page-Wise Admin Editor with Individual Section Save Buttons
- [x] G20.1: Individual `💾 Save Section` button on every section card (no single global overwrite required).
- [x] G20.2: Full page coverage: Home, Agroforestry, AWD, Carbon, About, Services, Species, Gallery, Contact, Privacy, Terms, Social Media, Inquiries.
- [x] G20.3: Frontend hydration via `main.js` ensures live reflection of updated CMS content.
CHECK: Chrome DevTools evaluation on /admin/
EXPECT: ALL_SECTIONS_EDITABLE_AND_SAVABLE

### Gate 21: Official WhatsApp Logo in Floating CTA
- [x] G21.1: Official WhatsApp phone handset SVG icon on green circle pill across all 19 customer-facing pages.
- [x] G21.2: Links to `https://wa.me/919963490444`.
CHECK: node scratch/update_whatsapp_svg.js
EXPECT: 19/19_PAGES_VERIFIED

### Gate 22: Selio-Style Application Form & Mobile Admin Responsive UI
- [x] G22.1: Farmer application form features Selio focus rings, custom select carets, and tactile `.cta-pill` button.
- [x] G22.2: Admin mobile view features full-width buttons, collapsible applicant cards, and zero horizontal scroll.
CHECK: Chrome DevTools resize_page to 375px; scrollWidth === clientWidth
EXPECT: ZERO_HORIZONTAL_OVERFLOW

### Gate 23: Complete 100% Website Content & Media Admin Architecture
- [x] G23.1: Full News & Media CRUD in Admin (`GET/POST/PUT/DELETE /api/news`): Add, Edit, Delete press clippings with Telugu/English headline, source, category, date, excerpt, body, and direct newspaper thumbnail upload.
- [x] G23.2: Full Field Photo Gallery CRUD in Admin (`GET/POST/DELETE /api/media`): Add photo with direct upload, caption, category, district, and delete with physical disk unlinking.
- [x] G23.3: Forms Management in Admin: Farmer Registration Form copy (`/new-plantation/`) and Contact Consultation Form copy (`/contact/`) with dedicated individual save buttons.
- [x] G23.4: Full FAQ CRUD in Admin (`GET/POST/PUT/DELETE /api/faq`): Bilingual English and Telugu questions and answers with category selection.
- [x] G23.5: Every section card has an individual `💾 Save Section` button with instant atomic persistence to disk.
CHECK: node scratch/test_news_faq_cms_api.js
EXPECT: ALL_CRUD_APIS_PASS_100%

### Gate 24: Universal Live Dynamic Frontend Hydration Engine
- [x] G24.1: `js/main.js` universally hydrates all pages on load from `/api/cms`, `/api/news`, `/api/faq`, and `/api/media` with zero-flicker localStorage cache.
- [x] G24.2: News page (`/news/`) dynamically updates its grid as articles are added/edited in Admin.
- [x] G24.3: FAQ page (`/faq/`) dynamically renders 3-column bilingual accordions.
- [x] G24.4: Field gallery (`/gallery/`) dynamically prepends uploaded field photos.
- [x] G24.5: Farmer registration (`/new-plantation/`) and contact (`/contact/`) dynamically display updated form headings and buttons.
CHECK: node scratch/verify_all_pages_live.js
EXPECT: ALL_PAGES_HYDRATED_LIVE_200_OK

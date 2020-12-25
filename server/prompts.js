const adwords = {
  keywordPrompt: 'Generate ad text for JotForm. Headlines must contain the following keywords: Fillable, Converter, Make\n' +
    'Headline1: Make a PDF Form Fillable\n' +
    'Headline2: Free Online Form Converter\n' +
    'Headline3: Generate Web Forms in Seconds\n' +
    'Description1: Collect PDF consent forms, registration forms, agreements, and contracts online.\n' +
    'Description2: Turn your PDFs into web forms in a single click. No HTML coding. Try for free today!\n' +
    '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: Patient Forms, Register, Schedule\n' +
    'Headline1: Free New Patient Forms\n' +
    'Headline2: Register New Patients Online\n' +
    'Headline3: Schedule More Patients Faster\n' +
    'Description1: Online new patient registration forms. Collect insurance information and e-signatures.\n' +
    'Description2: Keep data safe with HIPAA compliance. Make your patient onboarding process paperless.\n' +
    '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: Create, Get Paid, Order Form\n' +
    'Headline1: Free Online Order Form\n' +
    'Headline2: Create Your Custom Order Forms\n' +
    'Headline3: Get Paid Instantly\n' +
    'Description1: You can create many types of order forms like a t-shirt order or purchase order.\n' +
    'Description2: Process payments with no extra fees. Reach a wider audience and grow your company!\n' +
    '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: File Upload, Embed\n' +
    'Headline1: Build Forms with File Upload\n' +
    'Headline2: Create Upload Forms For Free\n' +
    'Headline3: Embed Your Forms on Any Site\n' +
    'Description1: Making upload forms has never been easier. Attach a file upload field to any online form\n' +
    'Description2: Collect user files of any format or size for free! Try the best form builder now.\n' +
    '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: Survey Sample, Unlimited\n' +
    'Headline1: Create A Survey Form For Free\n' +
    'Headline2: Survey Samples and Examples\n' +
    'Headline3: Ask Unlimited Questions\n' +
    'Description1: Conduct online surveys that are equally effective and engaging.\n' +
    'Description2: Choose from hundreds of ready-made survey templates to customize, embed, and integrate.\n' +
    '#\n' +
    'Generate ad text related to "{{audienceAndIndustry}} Industry" for JotForm. Headlines must contain the following keywords: {{keywords}}',

  urlPrompt: 'This smart tool is generating new ad texts for jotform.com\n' +
    '\n' +
    'Text: PDF FORMS REIMAGINED. Power your PDF forms. Filling out PDF forms shouldn’t be complicated. Turn your PDF forms into powerful online forms that are easy to fill out from any device with JotForm Smart PDF Forms — and give your users a seamless online form-filling experience.\n' +
    'Rule: The following ad text contains PDF Form and Fillable keywords in the Headline1.\n' +
    'Headline1: Make a PDF Form Fillable\n' +
    'Headline2: Free Online Form Converter\n' +
    'Headline3: Generate Web Forms in Seconds\n' +
    'Description1: Collect PDF consent forms, registration forms, agreements, and contracts online.\n' +
    'Description2: Turn your PDFs into web forms in a single click. No HTML coding. Try for free today!\n' +
    '###\n' +
    'Text: HIPAA-Compliant Online Forms. The easy and secure way to collect sensitive patient information. JotForm provides HIPAA-compliant forms and a business associate agreement (BAA) so your organization can collect health information safely and securely.\n' +
    'Rule: The following ad text contains Patient and New keywords in the Headline1.\n' +
    'Headline1: Free New Patient Forms\n' +
    'Headline2: Register New Patients Online\n' +
    'Headline3: Schedule More Patients Faster\n' +
    'Description1: Online new patient registration forms. Collect insurance information and e-signatures.\n' +
    'Description2: Keep data safe with HIPAA compliance. Make your patient onboarding process paperless.\n' +
    '###\n' +
    'Text: Online Website Ordering. Collect payments for products, services, subscriptions, and donations directly through your website. Connect custom online forms to popular payment gateways like Square, PayPal, and Stripe for seamless online website ordering. No coding or transaction fees.\n' +
    'Rule: The following ad text contains the Order keyword in the Headline1.\n' +
    'Headline1: Free Online Order Form\n' +
    'Headline2: Create Your Custom Order Forms\n' +
    'Headline3: Get Paid Instantly\n' +
    'Description1: You can create many types of order forms like a t-shirt order or purchase order.\n' +
    'Description2: Process payments with no extra fees. Reach a wider audience and grow your company!\n' +
    '###\n' +
    'Text: THE EASIEST WAY TO COLLECT FILE UPLOADS. Upload Files Online. Whether you’re accepting job applications, scholarship applications, or contest submissions, reduce email clutter by collecting submissions through a custom file upload form. Store photos, videos, documents, and more in your secure JotForm account for free — and upload files to Dropbox, Google Drive, or Box automatically! The best part? No coding skills required.\n' +
    'Rule: The following ad text contains Build Forms and File keywords in the Headline1.\n' +
    'Headline1: Build Forms with File Upload\n' +
    'Headline2: Create Upload Forms For Free\n' +
    'Headline3: Embed Your Forms on Any Site\n' +
    'Description1: Making upload forms has never been easier. Attach a file upload field to any online form\n' +
    'Description2: Collect user files of any format or size for free! Try the best form builder now.\n' +
    '###\n' +
    'Text: Free Online Survey Maker. Get the answers you need with JotForm. Whether you’re conducting research or gathering feedback, you can create engaging online surveys with our free drag-and-drop survey maker. Just add your own questions, set up conditional logic, and share your custom survey online to start collecting responses instantly.\n' +
    'Rule: The following ad text contains the Survey keyword in Headline1.\n' +
    'Headline1: Create A Survey Form For Free\n' +
    'Headline2: Survey Samples and Examples\n' +
    'Headline3: Ask Unlimited Questions\n' +
    'Description1: Conduct online surveys that are equally effective and engaging.\n' +
    'Description2: Choose from hundreds of ready-made survey templates to customize, embed, and integrate.\n' +
    '###\n' +
    'Text: {{heroText}}. {{descriptionText}}' +
    '{{keywords}}',

  adSetPrompt: 'This smart tool is generating alternative ad texts for JotForm.\n' +
    '\n' +
    'Original ad texts:\n' +
    'Headline1: Online Photo Order Forms\n' +
    'Headline2: Free Photography Booking Forms\n' +
    'Headline3: Photography Contract Templates\n' +
    'Description1: Our customizable forms make it easy for clients to book sessions, order prints, and more!\n' +
    'Description2: Collect client signatures and payments directly on your forms. \n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Free Photography Release Forms\n' +
    'Headline2: Online Photo Consent Forms\n' +
    'Headline3: Photography Waiver Form Templates\n' +
    'Description1: Protect image copyrights. Get permission for model release and use of likeness. \n' +
    'Description2: Customizable and legally binding. Collect e-signatures directly on your forms. \n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Custom Online Form Creator\n' +
    'Headline2: Create Forms in Seconds\n' +
    'Headline3: Works on Any Device\n' +
    'Description1: Create custom online forms for free. Choose from thousands of customizable form templates.\n' +
    'Description2: Publish your forms on your web page. Easy to customize, integrate, embed, and print. \n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Effortless Form Creation\n' +
    'Headline2: Free Online Form Creator\n' +
    'Headline3: Create Fillable PDF Forms\n' +
    'Description1: Create professional online forms in seconds with our drag-and-drop form creator. \n' +
    'Description2: Collect documents, signatures, and payments on your forms. Embed forms into your website.\n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Free Online Signup Forms\n' +
    'Headline2: Customizable Signup Forms\n' +
    'Headline3: Grow Your Email List \n' +
    'Description1: Convert visitors into subscribers with custom signup forms that stand out. \n' +
    'Description2: Publish on your website and gather new email addresses instantly.\n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Free Custom Signup Forms \n' +
    'Headline2: Online Signup Form Templates\n' +
    'Headline3: Gain More Subscribers \n' +
    'Description1: Convert more leads with personalized signup forms you can embed in your website.\n' +
    'Description2: Visitors can instantly subscribe to your mailing list or newsletter in just a few clicks.\n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Custom Donation Forms\n' +
    'Headline2:  Receive Donations Online\n' +
    'Headline3: Raise Money For Any Cause\n' +
    'Description1: Powerful online forms that make it easier for donors to help those in need. \n' +
    'Description2: Integrated with popular payment gateways to collect donations instantly.\n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Create A Donation Form\n' +
    'Headline2: Free Templates For Nonprofits\n' +
    'Headline3: Collect Donations Online\n' +
    'Description1: Custom donation forms customized for your nonprofit organization\'s fundraiser.\n' +
    'Description2: Receive donations directly on your forms with integrated payment gateways like Square.\n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Convert PDF to Fillable Form\n' +
    'Headline2: Free PDF Form Converter\n' +
    'Headline3: JotForm Smart PDF Forms\n' +
    'Description1: Turn PDF forms into fillable online forms in one click. Collect responses on any device.\n' +
    'Description2: Great for waives, agreements, consent forms, and more! Integrate with 100+ apps.\n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Convert PDF to Online Form\n' +
    'Headline2: Free Online PDF Converter\n' +
    'Headline3: Get Responses on Any Device\n' +
    'Description1: Collect responses online for your PDF consent forms, registration forms, and other forms!\n' +
    'Description2:  Access powerful features like conditional logic and 100+ integrations. No coding needed.\n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Free Online Consent Forms\n' +
    'Headline2: Templates for Medical & Travel\n' +
    'Headline3: Eliminate Messy Paperwork\n' +
    'Description1: Create online medical consent forms, activity waivers, photo releases, and more.\n' +
    'Description2:  Customize a free template. Convert to PDFs. Protect patient privacy with JotForm!\n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Create Consent Forms for Free\n' +
    'Headline2: Collect E-Signatures\n' +
    'Headline3: Generate Signed PDF Documents\n' +
    'Description1: Make custom consent forms for medical, travel, photography, and parent permission slips.\n' +
    'Description2: Receive signed consent forms online and convert responses to PDF documents — for free!\n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Free Employee Form Templates\n' +
    'Headline2: Customize without Coding\n' +
    'Headline3: Drag-and-Drop Form Builder\n' +
    'Description1: Create and customize employee forms for your business. No coding. Sign up for free now!\n' +
    'Description2: Build online application forms, employee records, performance reviews, and more.\n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Free Employee Form Samples\n' +
    'Headline2: Customize in Minutes\n' +
    'Headline3: No Coding Required\n' +
    'Description1: Customize our free employee form templates for your business without any coding.\n' +
    'Description2: Free drag-and-drop form builder. Create application forms, evaluation forms, and more!\n' +
    '--\n' +
    'Original ad texts:\n' +
    'Headline1: Build Dynamic Forms\n' +
    'Headline2: Free Online Form Builder\n' +
    'Headline3: No Coding Required\n' +
    'Description1: Gain momentum in your business. Collect better data faster with powerful online forms.\n' +
    'Description2: Easy to customize. Accept payments, signatures, files, and more. Integrate with 130+ apps.\n' +
    '**\n' +
    'Alternative ad texts:\n' +
    'Headline1: Create Dynamic Forms\n' +
    'Headline2: Free & Easy to Customize\n' +
    'Headline3: Streamline Your Workflow\n' +
    'Description1: Move your business forward with dynamic online forms. Collect the info you need, faster. \n' +
    'Description2: Customize 10,000+ templates. Unique form fields. 130+ integrations. No coding required.\n' +
    '--\n' +
    'Original ad texts:\n{{prompt}}',
};
const reddit = {
  keywordPrompt: '#\n' +
    'Generate ad text for JotForm. Title must contain the following keywords: Healthcare, Enterprise, Patient\n' +
    'Title: Still using paper forms? Your healthcare system needs an upgrade. Switch to JotForm Enterprise to securely collect and manage patient data online. Create Users and Admins to build a HIPAA-compliant data management workflow. Sign up for a JotForm Enterprise account today.\n' +
    '#\n' +
    'Generate ad text for JotForm. Title must contain the following keywords: Spreadsheet, Collaborate, Workspace\n' +
    'Title: Still tracking your data in spreadsheets? Switch to JotForm Tables and enjoy an all-in-one workspace that lets you collect data, keep it organized, and collaborate with coworkers or clients online. Explore 250+ free table templates for CRM, project management, budgeting, list-making, and more.\n' +
    '#\n' +
    'Generate ad text for JotForm. Title must contain the following keywords: Payment, Safe, PSD2\n' +
    'Title: Safely collect EU payments for products, services, or donations. Meet PSD2 regulations with JotForm. Create a custom payment form without coding and integrate it with PSD2-compliant gateways like Square, PayPal, Stripe, and more. Keep customer data protected and reduce fraud with strong customer authorization. Sign up for JotForm today.\n' +
    '#\n' +
    'Generate ad text related to "{{audienceAndIndustry}} Industry" for JotForm. Headlines must contain the following keywords: {{keywords}}',
  urlPrompt: 'This smart tool is generating new ad texts for jotform.com\n' +
    '\n' +
    'Text: More power. More support. JotForm Enterprise. JotForm Enterprise is a digital workplace productivity tool that provides a powerful ROI across your entire organization.\n' +
    'Rule: The following ad text contains Healthcare and HIPAA keywords in the Title.\n' +
    'Title: Still using paper forms? Your healthcare system needs an upgrade. Switch to JotForm Enterprise to securely collect and manage patient data online. Create Users and Admins to build a HIPAA-compliant data management workflow. Sign up for a JotForm Enterprise account today.\n' +
    '###\n' +
    'Text: When a spreadsheet isn’t enough for your team. Collect, organize, and manage data in an all-in-one workspace. Share in one click for seamless collaboration. See your data differently with JotForm Tables.\n' +
    'Rule: The following ad text contains Collaborate and Workspace keywords in the Title.\n' +
    'Title: Still tracking your data in spreadsheets? Switch to JotForm Tables and enjoy an all-in-one workspace that lets you collect data, keep it organized, and collaborate with coworkers or clients online. Explore 250+ free table templates for CRM, project management, budgeting, list-making, and more.\n' +
    '###\n' +
    'Text: PSD2-Compliant Payment Forms. Get paid for your products or services, sell subscriptions, or collect donations with JotForm’s PSD2-compliant forms. Build a custom payment form with JotForm and integrate it with a PSD2-compliant gateway — such as Square, PayPal Business, or Stripe — to protect your European customers’ cardholder data during transactions.\n' +
    'Rule: The following ad text contains the Payment keyword in the Title.\n' +
    'Title: Safely collect EU payments for products, services, or donations. Meet PSD2 regulations with JotForm. Create a custom payment form without coding and integrate it with PSD2-compliant gateways like Square, PayPal, Stripe, and more. Keep customer data protected and reduce fraud with strong customer authorization. Sign up for JotForm today.\n' +
    '###\n' +
    'Text: Receive Online Payments with JotForm. Sell your products, collect donations, and set up recurring subscriptions online with JotForm. Create a secure payment form for free, receive online payments with 30+ trusted payment gateway integrations, and grow your business!\n' +
    'Rule: The following ad text contains the Cake Order and Free keywords in the Title.\n' +
    'Title: Easy online cake ordering. Accept payments, set up recurring orders, and build a customer base when you use JotForm for your cake shop. Build a payment form in minutes for free. Integrate with Cake Carousel to showcase your cakes, then select payment gateways like Stripe, Square, PayPal, or Worldpay to accept online payments. Start selling cakes today!\n' +
    '\n' +
    '###\n' +
    'Text: {{heroText}}. {{descriptionText}}' +
    '{{keywords}}',
  adSetPrompt: 'This smart tool is generating alternative ad texts for JotForm.\n' +
    '\n' +
    'Original ad text:\n' +
    'Looking for a better way to collect and manage patient data online? JotForm Enterprise makes it easy to collect and manage sensitive health data across your organization. All data is protected on dedicated servers with 256-bit SSL, PCI, and HIPAA compliance. Sign up for a personalized plan today.\n' +
    '**\n' +
    'Alternative ad text:\n' +
    'Still using paper forms? Your healthcare system needs an upgrade. Switch to JotForm Enterprise to securely collect and manage patient data online. Create Users and Admins to build a HIPAA-compliant data management workflow. Sign up for a JotForm Enterprise account today.\n' +
    '--\n' +
    'Original ad text:\n' +
    'Still tracking your data in spreadsheets? Switch to JotForm Tables and enjoy an all-in-one workspace that lets you collect data, keep it organized, and collaborate with coworkers or clients online. Explore 250+ free table templates for CRM, project management, budgeting, list-making, and more.\n' +
    '**\n' +
    'Alternative ad text:\n' +
    'There\'s a simpler way to manage your data. Ditch spreadsheets and switch to an all-in-one online database with JotForm Tables! Collect and manage data in powerful tables,  calendars, and cards — or share in one click to collaborate with your team online. Customize a free template to get started.\n' +
    '--\n' +
    'Original ad text:\n{{prompt}}',
};


const facebook = {
  keywordPrompt: '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: Holiday, JotForm, November\n' +
    'PrimaryText: Treat yourself this holiday season. Get 50% off all JotForm plans! Ends November 30th.\n' +
    '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: HIPAA-compliant, Pandemic\n' +
    'PrimaryText: Create HIPAA-compliant online forms to combat the pandemic. Apply for a free plan today.\n' +
    '#\n' +
    'Generate ad text for JotForm. Headlines must contain the following keywords: Unlimited, Exclusive, Online\n' +
    'PrimaryText: Unlimited online forms with features exclusive to your company. Contact sales now!\n' +
    '#\n' +
    'Generate 1 ad text for JotForm. Headlines must contain the following keywords: {{keywords}}',
  urlPrompt: 'This smart tool is generating new ad texts for jotform.com\n' +
    '\n' +
    'Text: Want to upgrade for more forms, submissions, storage, and powerful features? Take advantage of our Black Friday sale and get 50% off all annual JotForm plans!\n' +
    'Rule: The following ad text contains holiday and November keywords in the Headline1.\n' +
    'PrimaryText: Treat yourself this holiday season. Get 50% off all JotForm plans! Ends November 30th.\n' +
    '###\n' +
    'Text: HIPAA-Compliant Online Forms. The easy and secure way to collect sensitive patient information. JotForm provides HIPAA-compliant forms and a business associate agreement (BAA) so your organization can collect health information safely and securely.\n' +
    'Rule: The following ad text contains HIPAA-compliant and Pandemic keywords in the Headline1.\n' +
    'PrimaryText: Create HIPAA-compliant online forms to combat the pandemic. Apply for a free plan today.\n' +
    '###\n' +
    'Text: More power. More support. JotForm Enterprise. JotForm Enterprise is a digital workplace productivity tool that provides a powerful ROI across your entire organization.\n' +
    'Rule: The following ad text contains unlimited keyword in the Headline1.\n' +
    'PrimaryText: Unlimited online forms with features exclusive to your company. Contact sales now!\n' +
    '###\n' +
    'Text: {{heroText}}. {{descriptionText}}' +
    '{{keywords}}',
  adSetPrompt: 'This smart tool is generating alternative ad texts for JotForm.\n' +
    '\n' +
    'Original ad text: Treat yourself this holiday season. Get 50% off all JotForm plans! Ends November 30th.\n' +
    '**\n' +
    'Alternative ad texts: Get 50% off JotForm plans with our Black Friday Sale! Offer ends November 30th.\n' +
    '--\n' +
    'Original ad texts: Create HIPAA-compliant online forms to combat the pandemic. Apply for a free plan today.\n' +
    '**\n' +
    'Alternative ad texts: Helping to fight the virus? Make HIPAA-compliant forms with a free unlimited JotForm plan.\n' +
    '--\n' +
    'Original ad texts: Manage data within every department of your company. Request pricing now! \n' +
    '**\n' +
    'Alternative ad texts: Advanced online forms built to streamline and centralize data for your company.\n' +
    '--\n' +
    'Original ad texts:\n{{prompt}}',
};
module.exports = { adwords, reddit, facebook };

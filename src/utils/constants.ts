export const FIELD_SELECTORS = {
    email: [
        'input[type="email"]',
        'input[name*="email" i]',
        'input[id*="email" i]',
        'input[placeholder*="email" i]',
        'input[aria-label*="email" i]'
      ],
    firstName: [
      'input[name="firstName"]',
      'input[name="firstname"]',
      'input[id*="first" i]',
      'input[placeholder*="first" i]',
      'input[aria-label*="first" i]',
      'input[class*="whsOnd" i][aria-label*="name" i]', 
      'input[class*="whsOnd" i][aria-label*="first" i]',
      'input.whsOnd.zHQkBf',             
    'input[class*="whsOnd" i]'
    ],
    lastName: [
      'input[name="lastName"]',
      'input[name="lastname"]',
      'input[id*="last" i]',
      'input[placeholder*="last" i]',
      'input[aria-label*="last" i]',
      'input[class*="whsOnd" i][aria-label*="last" i]',
       'input.whsOnd.zHQkBf',             
    'input[class*="whsOnd" i]'
    ],
    fullName: [
      'input[name="fullname"]',
      'input[name="fullName"]',
      'input[id*="full" i]',
      'input[placeholder*="full" i]',
      'input[aria-label*="full" i]',
      'input[name="name"]',
      'input[id="name"]',
      'input[class*="whsOnd" i][aria-label*="name" i]',  
      'input.whsOnd.zHQkBf',             
      'input[class*="whsOnd" i]' 
    ],
    age: [
      'input[name="age"]',
      'input[id*="age" i]',
      'input[placeholder*="age" i]',
      'input[aria-label*="age" i]',
      'input[class*="whsOnd" i][aria-label*="age" i]'
    ],
    mobile: [
      'input[name="mobile"]',
      'input[name="phone"]',
      'input[id*="mobile" i]',
      'input[id*="phone" i]',
      'input[placeholder*="mobile" i]',
      'input[placeholder*="phone" i]',
      'input[aria-label*="mobile" i]',
      'input[aria-label*="phone" i]',
      'input[class*="whsOnd" i][aria-label*="mobile" i]', 
      'input[class*="whsOnd" i][aria-label*="phone" i]',
       'input.whsOnd.zHQkBf[aria-labelledby]', 
    'input[class*="whsOnd" i][aria-labelledby]'
    ]
  }
  
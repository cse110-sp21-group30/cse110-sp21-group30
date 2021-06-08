# Color Themes Toggle
Date: [06-08-2021]

## Context and Problem Statement
Bullet Journals can be seen as very personal items, and as such we want to allow the user to perform some degree of personalization so that they can make their BuJo feel more like it is their own. Also, we want to include these personalization options in a way that doesn't clutter up the UI with any more buttons or selection options since we want to stick to our minimalist design philosophy. 

## Considered Options
We could choose to implement:
1. Custom color palettes for the icons/bullets/header, something like a color-wheel style picker where the user can assemble a palette of up to three unique colors to be used on the page. Each of the three colors could correspond to a particular item on the page, for example the header, the bullets, and then the page background. 
2. Offer a list of pre-made color themes that pertain to our groups brand/culture (beans/SoCal/UCSD etc). We could use the Dr. Bean logo in the top right as the selection button to avoid adding more elements to the UI. 


## Decision Outcome

We decided to choose option (2), because allowing the user to choose their own colors would require more development time and we wanted to allow for more time to spend on testing and other UI improvements and tweaks like icon changes. In addition, a color-wheel picker or some sort of color shade selector would require an additional UI menu which was something we wanted to avoid if possible because part of the professor's feedback to us was that we needed to keep the UI clean if at all possible. Option 2 was also more attractive because it allowed us to incorporate our Cool Beans<sup><sub>TM</sub></sup> branding in the default theme since our group colors are blue and brown (to represent cool beans). The other themes also relate to our group culture with a UCSD theme, and a surf theme since we're based in SoCal. In addition, using the Dr. Bean icon in the top left that we already had on the page as the origin for our drop down list of theme choices was a great way to avoid adding any more elements to the UI page and keep in line with our minimalist design. 
# Location Data Structure

This directory contains all location-specific data for the Tech Cloud ERP website's location pages.

## Structure

Each location has its own JSON file named `techcloud-erp-software-in-{location}.json` with the following structure:

```json
{
  "{locationKey}": {
    "title": "Page title for SEO",
    "heading": "Display heading on the page",
    "image": "/images/contact/{location}.webp",
    "description": "Detailed description about the ERP services in this location",
    "features": [
      "Feature 1",
      "Feature 2",
      ...
    ],
    "items": [
      {
        "icon": "/images/location/{Location}/icon.svg",
        "alt": "Alt text for icon",
        "title": "Item title",
        "description": "Item description"
      },
      ...
    ]
  }
}
```

## Available Locations

### Indian Cities
- Chennai (`chennai`)
- Hyderabad (`hyderabad`)
- Coimbatore (`coimbatore`)
- Bangalore (`bangalore`)
- Kolkata (`kolkata`)
- Mumbai (`mumbai`)
- Kochi (`kochi`)
- Delhi (`delhi`)
- Ahmedabad (`ahmedabad`)
- Vizag (`vizag`)

### Middle East Countries
- Bahrain (`bahrain`)
- Kuwait (`Kuwait`)
- Oman (`Oman`)
- Qatar (`Qatar`)
- UAE (`UAE`) - Special structure with emirates array

### UAE Emirates
The UAE location has a special structure with an `emirates` array:
- Dubai (`dubai`)
- Abu Dhabi (`abudhabi`)
- Sharjah (`sharjah`)
- Ajman (`ajman`)

### Other Countries
- USA (`USA`)

## Usage

All location data is exported through `index.js`:

```javascript
import { locationData } from '../../../data/location';

// Access a specific location
const chennaiData = locationData.chennai;
```

## URL Mapping

The page uses a URL-to-data mapping to handle multiple URL formats for the same location. See `urlToDataMap` in `app/locations/[slug]/page.js`.

## Adding a New Location

1. Create a new JSON file: `techcloud-erp-software-in-{location}.json`
2. Follow the structure shown above
3. Add the import in `index.js`
4. Add the export in the `locationData` object
5. Update the `urlToDataMap` in `page.js` to include URL mappings
6. Add the slug to `generateStaticParams()` in `page.js`
7. Add corresponding images to `/public/images/contact/` and `/public/images/location/{Location}/`

## Special Features

### Items Array
Each location can have an `items` array with icon-based features. These are used by the WhyChooseUs component.

### UAE Emirates
The UAE location includes an `emirates` array that is displayed as a card grid on the UAE location page.

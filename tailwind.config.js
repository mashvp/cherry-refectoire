require('dotenv').config();
const plugin = require('tailwindcss/plugin');

const data = {
  colors: {},
  fontFamily: {},
  fontSize: {},
}

  //==========================================> CHOIX INSTANCE <=====================================//
const customFont = {};

switch (process.env.INSTANCE) {
  //===================> CHERRY BOMBE
  case "cherry":


    data.colors = {
      'transparent': 'transparent',
      'Primary' : '#DC0000',
      'Secondary' : '#ED692C',
      'Tertiary' : '#010543',
      'ClearPrimary' : '#FEF8E9',

    };

    data.fontFamily = {
      titre: ['TT Ramillas', 'serif'],
      base: ['Inter', 'sans-serif'],
      cta: ['Inter', 'sans-serif'],
    }

    data.fontSize = {
      hs1: ['var(--fs-hs1)', {
        lineHeight: '1',
        letterSpacing: '0',
        fontWeight: '700',
      }],
      hs2: ['var(--fs-hs2)', {
        lineHeight: '1',
        letterSpacing: '0',
        fontWeight: '700',
        fontFamily: 'Graphik, serif'
      }],
      hs3: ['var(--fs-hs3)', {
        lineHeight: '1',
        letterSpacing: '0',
        fontWeight: '700',
        
      }],
      base: ['var(--fs-medium)', {
        lineHeight: '1.5',
        letterSpacing: '0',
        fontWeight: '400',
      }],
      small: ['var(--fs-small)', {
        lineHeight: '1',
        letterSpacing: '0',
        fontWeight: '700',
      }],
      cta: ['var(--fs-cta)', {
        lineHeight: '1',
        letterSpacing: '0',
        fontWeight: '300',
      }],

    }

    // Object.entries(object1).forEach(key=>{

    // })
    // customFont[]


  break;
  //===================> REFECTOIRE
  case "refectoire":

    data.colors = {
      'transparent': 'transparent',
    };
  break;

}

  //==========================================> Base Commen <=====================================//

const screens = {
  // 'xl': {'min': '1920px'},
  'd-l': {'max': '1680px'},
  'd-m': {'max': '1560px'},
  'd-s': {'max': '1440px'},
  'd-xs': {'max': '1220px'},
  't-m': {'max': '1080px'},
  'm-m': {'max': '820px'},
  'm-s': {'max': '375px'},
  'm-p': { 'raw': '(oriantation: landscape and min-width: 769px)' },
};
const spacing = {
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '5': '5px',
  '8': '8px',
  '10': '10px',
  '16': '16px',
  '20': '20px',
  '24': '24px',
  '40': '40px',
  '50': '50px',
  '60': '60px',
  '80': '80px',
  '100': '100px',
  '150': '150px',
  '200': '200px',
  '250': '250px',
  '400': '400px',

  '4w': '4vw',
  '6w': '6vw',
  '8w': '8vw',
  '10w': '10vw',
  '16w': '16vw',
  '20w': '20vw',
  '24w': '24vw',
  '60w': '60vw',

  '4%': '4%',

  'header': 'var(--h-header)',

};




  //==========================================> CUSTOM / EXTENDS <=====================================//
//=======> GRID COLUMN
const gridNb = 18;
const extendGrid = {};

for (let x = 1; x <= gridNb; x ++) {
  extendGrid[`${x}`] = `${x}`;

  for (let y = x+1; y <= gridNb+1; y ++) {
    extendGrid[`${x}-${y}`] = `${x} / ${y}`;
  }
}

//=======> Align
const res = ['start', 'center', 'end'];
const customAlign = {};

res.forEach(x=>{
  res.forEach(y=>{
    customAlign[`.a-${x}-${y}`] = {
      'justify-self': x,
      'align-self': y,
    };
  });
});

res.forEach(x=>{
  customAlign[`.ax-${x}`] = {
    'justify-self': x,
  };
  customAlign[`.ay-${x}`] = {
    'align-self': x,
  };
});


//=======> Margin
// const customMargin = {};
// const customPadding = {};

// spacing.forEach((el, key)=>{
//   customMargin[`.mx-${key}`] = {
//       'margin-right': el,
//       'margin-left': el,
//     };
// });

// spacing.forEach((el, key)=>{
//   customPadding[`.my-${key}`] = {
//     'margin-top': el,
//     'margin-bottom': el,
//   };
// });


//=======> Grid




  //==========================================> Config <=====================================//


module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: data.colors,
    fontFamily: data.fontFamily,
    fontSize: data.fontSize,
    screens: screens,
    spacing: spacing,
    borderRadius: {
      '4': '4px'
    },
    
    extend: {
      zIndex: {
        100: 100,
        400: 400,
      },
      gridColumn: extendGrid,
      gridRow: extendGrid,
      gridTemplateColumns: {
        'header': 'minmax(0, 1fr) auto minmax(0, 1fr)',
        'header-m': 'minmax(0, 1fr) minmax(0, 1fr)',
      }

    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ... customAlign
        // ... customMargin,
        // ... customPadding
      })
    }),
  ],
};


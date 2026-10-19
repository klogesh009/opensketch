'use strict';
// Original lesson content for OpenSketch. Guides are drawn in a 100x100 box.
(function () {
  const H = (inner) => `<g transform="translate(50 34) scale(.75) translate(-50 -50)">${inner}</g>`;
  const petals = [0, 60, 120, 180, 240, 300]
    .map((a) => `<path transform="rotate(${a} 50 50)" d="M50 42C38 30 40 12 50 8C60 12 62 30 50 42Z"/>`).join('');
  const veins = [0, 60, 120, 180, 240, 300]
    .map((a) => `<path transform="rotate(${a} 50 50)" d="M50 38V19"/>`).join('');

  window.LESSONS = [
    {
      id: 'warmup', title: 'Warm-up: lines & curves', level: 'Foundations', time: '5 min',
      desc: 'Loosen your hand with confident strokes.',
      steps: [
        { t: 'Straight lines', d: 'Draw each line in one quick, confident stroke, moving from your shoulder rather than your wrist. Do not go back and forth.',
          svg: '<path d="M10 10H90M10 18H90M10 26H90"/><path d="M10 34L26 52M30 34L46 52M50 34L66 52M70 34L86 52"/>' },
        { t: 'Waves', d: 'Trace the two wavy lines. Keep the rhythm even and let the curves flow without stopping.',
          svg: '<path d="M10 62C20 54 30 70 40 62S60 54 70 62S84 70 90 62"/><path d="M10 72C20 64 30 80 40 72S60 64 70 72S84 80 90 72"/>' },
        { t: 'Circles & ovals', d: 'Draw two circles and an oval. Try a few loose practice loops in the air first, then commit.',
          svg: '<circle cx="22" cy="90" r="8"/><circle cx="50" cy="90" r="8"/><ellipse cx="78" cy="90" rx="12" ry="7"/>' },
      ],
    },
    {
      id: 'value', title: 'Value scale', level: 'Foundations', time: '10 min',
      desc: 'Learn to control light and dark with your pencil.',
      steps: [
        { t: 'Draw five boxes', d: 'Draw five boxes in a row, side by side. These will become your tonal steps.',
          svg: '<rect x="4" y="38" width="16" height="22"/><rect x="23" y="38" width="16" height="22"/><rect x="42" y="38" width="16" height="22"/><rect x="61" y="38" width="16" height="22"/><rect x="80" y="38" width="16" height="22"/>' },
        { t: 'Lightest and darkest', d: 'Leave the first box paper-white. Fill the last box as dark as you can with firm, even strokes.',
          svg: '<path d="M6 72H94M88 68L94 72L88 76"/>' },
        { t: 'Fill the midtones', d: 'Make each box one step darker than the one before. Build tone with light layers instead of pressing hard.',
          svg: '<path d="M12 31V35M31 31V35M50 31V35M69 31V35M88 31V35"/>' },
        { t: 'Smooth gradient strip', d: 'Shade a long strip from white to black in one smooth blend. Use the Blend tool to soften any visible lines.',
          svg: '<rect x="4" y="80" width="92" height="14"/>' },
      ],
    },
    {
      id: 'sphere', title: 'Shading a sphere', level: 'Foundations', time: '15 min',
      desc: 'Turn a flat circle into a round, solid ball.',
      steps: [
        { t: 'Draw the circle', d: 'Draw a clean circle. Keep your pencil light so you can adjust it.',
          svg: '<circle cx="50" cy="50" r="30"/>' },
        { t: 'Light and core shadow', d: 'The arrow marks the light source in the top-left. The curved line is the core shadow, where light turns to dark.',
          svg: '<path d="M8 8L26 26M26 26L18 25M26 26L25 18"/><path d="M70 30C61 43 55 58 41 77"/>' },
        { t: 'Shade the dark side', d: 'Add curved strokes that follow the sphere on the shadow side. Layer them, darkest near the core shadow, and leave a thin band of lighter reflected light at the very edge.',
          svg: '<path d="M73 33C64 46 58 60 46 77M77 41C70 54 64 66 54 79M79 49C74 58 69 68 62 76"/>' },
        { t: 'Cast shadow', d: 'Add a soft oval shadow on the ground, pointing away from the light. It is darkest right under the sphere.',
          svg: '<ellipse cx="64" cy="86" rx="28" ry="6"/>' },
      ],
    },
    {
      id: 'cube', title: 'Shading a cube', level: 'Foundations', time: '15 min',
      desc: 'See how light hits flat faces.',
      steps: [
        { t: 'Front face', d: 'Draw the front square of the cube.',
          svg: '<path d="M24 42H62V80H24Z"/>' },
        { t: 'Top and side', d: 'Add the top and the right side. Keep parallel edges parallel.',
          svg: '<path d="M24 42L40 26H78L62 42"/><path d="M62 42L78 26V64L62 80"/>' },
        { t: 'Choose the light', d: 'Light comes from the top-left. The top face is lightest, the front is in the middle and the right side is darkest.',
          svg: '<path d="M6 8L22 24M22 24L14 23M22 24L21 16"/>' },
        { t: 'Shade and cast shadow', d: 'Shade the side face with straight, even strokes and give the front a medium tone. Finish with a cast shadow to the right.',
          svg: '<path d="M66 44L74 36M66 54L74 46M66 64L74 56M66 72L74 64"/><path d="M62 80L78 64L94 68L80 86Z"/>' },
      ],
    },
    {
      id: 'apple', title: 'Apple', level: 'First drawings', time: '15 min',
      desc: 'A friendly shape to practise shading.',
      steps: [
        { t: 'Body', d: 'Sketch the rounded body with a little dip at the top.',
          svg: '<path d="M50 30C40 22 20 24 18 46C16 70 32 92 46 90C50 89 50 89 54 90C68 92 84 70 82 46C80 24 60 22 50 30Z"/>' },
        { t: 'Stem and leaf', d: 'Add a short curved stem and a pointed leaf.',
          svg: '<path d="M50 30C50 22 52 15 56 10"/><path d="M54 20C60 8 76 8 80 14C74 24 62 26 54 20Z"/>' },
        { t: 'Highlight and dimple', d: 'Mark a small highlight on the left and the dimple around the stem. Leave the highlight white.',
          svg: '<path d="M27 46C27 38 31 33 38 31"/><path d="M42 29C46 33 54 33 58 29"/>' },
        { t: 'Shade it', d: 'Shade the right side with curved strokes and add a soft shadow under the apple.',
          svg: '<path d="M72 40L78 52M68 52L76 68M63 64L71 80M56 74L63 86"/><path d="M26 93C42 99 70 99 86 92"/>' },
      ],
    },
    {
      id: 'cat', title: 'Cat face', level: 'First drawings', time: '20 min',
      desc: 'Simple shapes, lots of personality.',
      steps: [
        { t: 'Head', d: 'Draw a wide, rounded head, slightly flat at the top.',
          svg: '<path d="M50 28C75 28 88 46 86 62C84 80 68 90 50 90C32 90 16 80 14 62C12 46 25 28 50 28Z"/>' },
        { t: 'Ears', d: 'Add two pointed ears that sit on the upper corners of the head.',
          svg: '<path d="M24 42L20 12L44 30"/><path d="M76 42L80 12L56 30"/>' },
        { t: 'Eyes', d: 'Draw two almond eyes with thin vertical pupils. Leave a tiny white spot in each for sparkle.',
          svg: '<path d="M30 56C34 49 42 49 45 56C42 63 34 63 30 56Z"/><path d="M55 56C58 49 66 49 70 56C66 63 58 63 55 56Z"/><path d="M37.5 52V60M62.5 52V60"/>' },
        { t: 'Nose and mouth', d: 'Add a small triangle nose and a mouth shaped like a gentle W.',
          svg: '<path d="M46 67L54 67L50 72Z"/><path d="M50 72V77M50 77C46 81 42 81 40 78M50 77C54 81 58 81 60 78"/>' },
        { t: 'Whiskers and fur', d: 'Finish with whiskers and a few short fur strokes. Add shading inside the ears.',
          svg: '<path d="M30 70L6 66M30 75L6 78M70 70L94 66M70 75L94 78"/><path d="M28 36L32 44M72 36L68 44"/>' },
      ],
    },
    {
      id: 'flower', title: 'Flower', level: 'First drawings', time: '15 min',
      desc: 'Build a bloom from repeating petals.',
      steps: [
        { t: 'Centre', d: 'Draw a small circle for the middle of the flower.',
          svg: H('<circle cx="50" cy="50" r="8"/>') },
        { t: 'Petals', d: 'Add six petals evenly around the centre. Think of a clock face: start at 12, then 2, 4, 6, 8 and 10.',
          svg: H(petals) },
        { t: 'Stem and leaves', d: 'Draw a gently curving stem with two leaves.',
          svg: '<path d="M50 66C47 78 53 88 50 98"/><path d="M50 86C38 76 28 80 26 86C34 92 46 92 50 86Z"/><path d="M50 78C62 68 72 72 74 78C66 84 54 84 50 78Z"/>' },
        { t: 'Details', d: 'Add veins to the petals and seeds in the middle, then shade the base of each petal.',
          svg: H(veins + '<circle cx="46" cy="48" r="1"/><circle cx="54" cy="48" r="1"/><circle cx="50" cy="53" r="1"/>') + '<path d="M30 98H70"/>' },
      ],
    },
    {
      id: 'house', title: 'Little house', level: 'First drawings', time: '20 min',
      desc: 'Practise straight lines and simple perspective.',
      steps: [
        { t: 'Walls', d: 'Draw the front of the house with straight, even lines.',
          svg: '<path d="M20 50V90H80V50"/>' },
        { t: 'Roof and chimney', d: 'Draw the triangle roof overhanging the walls a little, then add a chimney.',
          svg: '<path d="M12 52L50 20L88 52Z"/><path d="M68 36V22H76V42"/>' },
        { t: 'Door and windows', d: 'Add a door with a round knob and two windows with cross bars.',
          svg: '<path d="M42 90V66H58V90"/><circle cx="55" cy="79" r="1"/><path d="M26 60H38V72H26ZM62 60H74V72H62Z M32 60V72M26 66H38M68 60V72M62 66H74"/>' },
        { t: 'Finishing touches', d: 'Add the ground, roof tiles and bushes. Shade under the roof edge to make the house feel solid.',
          svg: '<path d="M4 90H96"/><path d="M24 44H76M20 49H80"/><path d="M8 90C8 82 18 82 18 90M82 90C82 82 92 82 92 90"/>' },
      ],
    },
    {
      id: 'landscape', title: 'Mountain lake', level: 'First drawings', time: '25 min',
      desc: 'Layer near and far to create depth.',
      steps: [
        { t: 'Mountains', d: 'Draw a jagged mountain line and a flat horizon underneath it.',
          svg: '<path d="M0 66L24 32L38 50L58 20L84 56L100 46"/><path d="M0 66H100"/>' },
        { t: 'Snow caps', d: 'Add zigzag snow caps to the two tallest peaks.',
          svg: '<path d="M17 42L24 32L30 41L26 39L22 43Z"/><path d="M50 32L58 20L66 33L61 30L57 35L53 30Z"/>' },
        { t: 'Sun and clouds', d: 'Draw a sun in the sky and a puffy cloud.',
          svg: '<circle cx="82" cy="18" r="7"/><path d="M8 20C8 13 17 13 18 17C22 11 31 13 30 20Z"/>' },
        { t: 'Lake and tree', d: 'Add horizontal ripples on the lake and a pine tree in the foreground. Shade the mountains darker on one side.',
          svg: '<path d="M8 76H38M16 82H52M6 88H44"/><path d="M82 52L74 68H90Z"/><path d="M82 62L72 80H92Z"/><path d="M82 80V90"/>' },
      ],
    },
  ];

  window.DAILY_PROMPTS = [
    'a sleepy owl', 'your favourite mug', 'a paper boat on water', 'a pair of old shoes', 'a cactus in a pot',
    'a street lamp at night', 'a bicycle', 'a bowl of fruit', 'a cozy reading corner', 'a lighthouse',
    'a pair of glasses', 'a teapot', 'a hot air balloon', 'a sunflower', 'a fox curled up',
    'a stack of books', 'a rainy window', 'a seashell', 'a tiny house on a hill', 'a spaceship',
    'a hand holding something', 'a leaf, with all its veins', 'a candle and its shadow', 'a whale in the sky',
    'a key', 'a cup of coffee, from above', 'a pine forest', 'a robot watering a plant', 'a camera',
    'a feather', 'a snail', 'an ice-cream cone', 'a pair of headphones', 'a castle on a cloud',
    'a moth near a lamp', 'a pocket watch', 'a mushroom family', 'a bridge over a river', 'a koi fish',
    'a desk lamp', 'a hedgehog', 'a mountain at sunrise', 'a bunch of balloons', 'an umbrella in the rain',
  ];
})();

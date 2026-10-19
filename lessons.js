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

// ---- More drawings and colouring pages ----
(function () {
  const rot = (n, fn) => Array.from({ length: n }, (_, i) => fn((i * 360) / n, i)).join('');
  const star = (cx, cy, R, r, n = 5) => {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / n, rad = i % 2 ? r : R;
      d += (i ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(1) + ' ' + (cy + rad * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z"/>`;
  };
  const wave = (y) => `<path d="M6 ${y}C14 ${y - 4} 22 ${y + 4} 30 ${y}S46 ${y - 4} 54 ${y}S70 ${y + 4} 78 ${y}S92 ${y - 4} 96 ${y}"/>`;
  const sunHead = (inner) => `<g transform="translate(50 34) scale(.8) translate(-50 -42)">${inner}</g>`;

  ['apple', 'house', 'flower', 'cat'].forEach((id) => { const l = LESSONS.find((x) => x.id === id); if (l) l.colour = true; });

  const more = [
    // ---------------- Animals ----------------
    { id: 'fish', title: 'Fish', level: 'Animals', time: '10 min', colour: true, desc: 'A smooth body, a tail and tiny scales.', steps: [
      { t: 'Body', d: 'Draw a soft leaf shape for the body, pointed at both ends.', svg: '<path d="M18 50C30 28 62 28 76 50C62 72 30 72 18 50Z"/>' },
      { t: 'Tail', d: 'Add a triangle tail at the back of the body.', svg: '<path d="M76 50L94 34V66Z"/>' },
      { t: 'Eye and fins', d: 'Draw a round eye near the front, then a fin on top and one underneath.', svg: '<circle cx="34" cy="46" r="3.2"/><path d="M48 32C52 22 60 22 62 31"/><path d="M46 68C50 78 58 78 60 69"/>' },
      { t: 'Scales and bubbles', d: 'Add a curved gill line, a few scale arcs and a small smile. Finish with bubbles.', svg: '<path d="M42 40C38 46 38 54 42 60"/><path d="M52 44C56 47 56 53 52 56M62 44C66 47 66 53 62 56"/><path d="M20 52C23 54 26 54 28 52"/><circle cx="12" cy="36" r="2.4"/><circle cx="18" cy="26" r="1.8"/>' },
    ] },
    { id: 'owl', title: 'Owl', level: 'Animals', time: '15 min', colour: true, desc: 'Big eyes and fluffy feathers.', steps: [
      { t: 'Body', d: 'Draw a tall egg shape for the body.', svg: '<ellipse cx="50" cy="56" rx="26" ry="32"/>' },
      { t: 'Ear tufts', d: 'Add two pointed tufts on top of the head.', svg: '<path d="M28 34L24 14L42 26M72 34L76 14L58 26"/>' },
      { t: 'Big eyes', d: 'Draw two large circles for eyes, then a smaller circle inside each.', svg: '<circle cx="39" cy="44" r="10"/><circle cx="61" cy="44" r="10"/><circle cx="39" cy="44" r="4"/><circle cx="61" cy="44" r="4"/>' },
      { t: 'Beak and belly', d: 'Draw a small triangle beak between the eyes and little feather arcs on the belly.', svg: '<path d="M45 54L55 54L50 63Z"/><path d="M40 70Q44 66 48 70M52 70Q56 66 60 70M46 78Q50 74 54 78"/>' },
      { t: 'Wings and branch', d: 'Add curved wings at each side and a branch for your owl to perch on.', svg: '<path d="M26 52C16 62 20 78 32 84"/><path d="M74 52C84 62 80 78 68 84"/><path d="M10 92H90"/><path d="M40 88L38 92M60 88L62 92"/>' },
    ] },
    { id: 'butterfly', title: 'Butterfly', level: 'Animals', time: '15 min', desc: 'Symmetry in every wing.', steps: [
      { t: 'Body', d: 'Draw a long thin body and a small round head.', svg: '<ellipse cx="50" cy="54" rx="3.5" ry="20"/><circle cx="50" cy="30" r="4"/>' },
      { t: 'Antennae', d: 'Add two curved antennae.', svg: '<path d="M48 27C44 18 40 16 36 16M52 27C56 18 60 16 64 16"/>' },
      { t: 'Upper wings', d: 'Draw the two big upper wings. Make them mirror images of each other.', svg: '<path d="M46 46C30 20 10 22 12 40C14 52 32 56 46 50"/><path d="M54 46C70 20 90 22 88 40C86 52 68 56 54 50"/>' },
      { t: 'Lower wings and spots', d: 'Add smaller lower wings and a round spot on each upper wing.', svg: '<path d="M46 56C32 56 22 70 30 80C38 86 46 74 47 62"/><path d="M54 56C68 56 78 70 70 80C62 86 54 74 53 62"/><circle cx="26" cy="38" r="5"/><circle cx="74" cy="38" r="5"/>' },
    ] },
    { id: 'penguin', title: 'Penguin', level: 'Animals', time: '15 min', colour: true, desc: 'A cheerful black and white friend.', steps: [
      { t: 'Body', d: 'Draw a big oval for the body.', svg: '<ellipse cx="50" cy="56" rx="24" ry="32"/>' },
      { t: 'Belly', d: 'Draw a lighter belly shape inside the body.', svg: '<path d="M36 40C40 34 60 34 64 40C70 56 64 80 50 84C36 80 30 56 36 40Z"/>' },
      { t: 'Eyes and beak', d: 'Add two small eyes and a triangle beak.', svg: '<circle cx="43" cy="42" r="2.4"/><circle cx="57" cy="42" r="2.4"/><path d="M45 48L55 48L50 55Z"/>' },
      { t: 'Flippers and feet', d: 'Draw a flipper on each side and two little feet.', svg: '<path d="M27 52C16 60 18 72 26 74"/><path d="M73 52C84 60 82 72 74 74"/><path d="M38 90C34 92 34 96 40 96H46M62 90C66 92 66 96 60 96H54"/>' },
    ] },
    { id: 'dog', title: 'Puppy face', level: 'Animals', time: '15 min', desc: 'Floppy ears and a happy tongue.', steps: [
      { t: 'Head', d: 'Draw a rounded head, a bit wider at the top.', svg: '<path d="M50 28C70 28 78 44 76 60C74 78 62 88 50 88C38 88 26 78 24 60C22 44 30 28 50 28Z"/>' },
      { t: 'Floppy ears', d: 'Add a long floppy ear on each side of the head.', svg: '<path d="M28 36C14 34 8 52 14 68C22 70 28 60 28 50"/><path d="M72 36C86 34 92 52 86 68C78 70 72 60 72 50"/>' },
      { t: 'Eyes', d: 'Draw two round eyes. Leave a tiny white dot in each so they sparkle.', svg: '<circle cx="39" cy="52" r="3.5"/><circle cx="61" cy="52" r="3.5"/>' },
      { t: 'Snout', d: 'Add an oval snout, a nose and a smiling mouth.', svg: '<ellipse cx="50" cy="68" rx="12" ry="9"/><path d="M44 63H56L50 70Z"/><path d="M50 70V76M50 76C46 80 42 79 40 76M50 76C54 80 58 79 60 76"/>' },
      { t: 'Tongue and spot', d: 'Draw a tongue and a patch of fur around one eye.', svg: '<path d="M46 78C46 86 54 86 54 78"/><circle cx="62" cy="40" r="5"/>' },
    ] },
    { id: 'rabbit', title: 'Bunny', level: 'Animals', time: '15 min', desc: 'Long ears and whiskers.', steps: [
      { t: 'Head', d: 'Draw a round, slightly wide head.', svg: '<ellipse cx="50" cy="62" rx="22" ry="20"/>' },
      { t: 'Ears', d: 'Add two tall ears rising from the top of the head.', svg: '<path d="M40 44C34 22 34 8 42 8C50 8 50 28 46 42"/><path d="M60 44C66 22 66 8 58 8C50 8 50 28 54 42"/>' },
      { t: 'Eyes and nose', d: 'Draw two eyes and a tiny triangle nose.', svg: '<circle cx="42" cy="58" r="2.6"/><circle cx="58" cy="58" r="2.6"/><path d="M47 64H53L50 68Z"/>' },
      { t: 'Mouth and whiskers', d: 'Draw a small mouth and three whiskers on each side.', svg: '<path d="M50 68V72M50 72C46 76 43 75 42 73M50 72C54 76 57 75 58 73"/><path d="M36 66L18 62M36 70L18 72M64 66L82 62M64 70L82 72"/>' },
      { t: 'Inner ears', d: 'Draw the inner part of each ear and shade it softly.', svg: '<path d="M42 40C39 26 39 16 42 16M58 40C61 26 61 16 58 16"/>' },
    ] },
    { id: 'turtle', title: 'Turtle', level: 'Animals', time: '15 min', desc: 'A patterned shell and a friendly face.', steps: [
      { t: 'Shell', d: 'Draw a dome for the shell with a flat bottom.', svg: '<path d="M16 62C16 34 84 34 84 62Z"/>' },
      { t: 'Head and legs', d: 'Add a round head at the front and two short legs underneath.', svg: '<circle cx="90" cy="54" r="7"/><path d="M26 62V72H38V62M62 62V72H74V62"/>' },
      { t: 'Shell pattern', d: 'Divide the shell into plates with straight lines.', svg: '<path d="M38 62L34 46H66L62 62M34 46L50 38L66 46"/>' },
      { t: 'Face and ground', d: 'Add an eye and a smile, then a line for the ground.', svg: '<circle cx="92" cy="52" r="1.2"/><path d="M89 58C91 60 94 59 95 57"/><path d="M6 76H94"/>' },
    ] },
    { id: 'duck', title: 'Duck', level: 'Animals', time: '15 min', desc: 'Floating on a calm pond.', steps: [
      { t: 'Body', d: 'Draw a wide oval for the body.', svg: '<ellipse cx="46" cy="66" rx="30" ry="20"/>' },
      { t: 'Head', d: 'Add a round head at the upper right of the body.', svg: '<circle cx="68" cy="40" r="14"/>' },
      { t: 'Beak and eye', d: 'Draw a rounded beak and a small eye.', svg: '<path d="M80 40C90 38 94 42 90 46C86 48 82 46 80 46Z"/><circle cx="68" cy="36" r="2"/>' },
      { t: 'Wing, tail and water', d: 'Add a wing, a little tail and wavy water underneath.', svg: '<path d="M30 64C38 56 52 58 54 68C46 74 34 72 30 64Z"/><path d="M16 60L8 52L18 54"/><path d="M6 90C14 86 22 94 30 90S46 86 54 90S70 94 78 90S92 86 96 90"/>' },
    ] },
    // ---------------- Nature ----------------
    { id: 'tree', title: 'Big tree', level: 'Nature', time: '15 min', desc: 'A leafy crown and a strong trunk.', steps: [
      { t: 'Trunk', d: 'Draw a trunk that is a little wider at the bottom.', svg: '<path d="M44 94L46 58H54L56 94"/>' },
      { t: 'Leafy crown', d: 'Draw three overlapping circles for a fluffy crown.', svg: '<circle cx="50" cy="38" r="22"/><circle cx="34" cy="48" r="14"/><circle cx="66" cy="48" r="14"/>' },
      { t: 'Branches and leaves', d: 'Add two branches inside the crown and a few curved leaf marks.', svg: '<path d="M50 58L40 46M50 58L62 44"/><path d="M40 30C44 26 48 28 50 32M56 38C60 34 64 36 66 40"/>' },
      { t: 'Ground and fruit', d: 'Draw the ground and a few round fruits.', svg: '<path d="M20 94H80"/><circle cx="38" cy="52" r="2.6"/><circle cx="60" cy="34" r="2.6"/><circle cx="68" cy="52" r="2.6"/>' },
    ] },
    { id: 'sunflower', title: 'Sunflower', level: 'Nature', time: '20 min', desc: 'A sunny flower with lots of petals.', steps: [
      { t: 'Centre', d: 'Draw a circle for the middle of the flower.', svg: '<circle cx="50" cy="38" r="10"/>' },
      { t: 'Petals', d: 'Draw long oval petals all around the centre. Work like a clock, 12, 6, 3, 9 and then fill in the gaps.', svg: rot(12, (a) => `<ellipse transform="rotate(${a} 50 38)" cx="50" cy="19" rx="4.5" ry="9"/>`) },
      { t: 'Stem and leaves', d: 'Add a long stem and two big leaves.', svg: '<path d="M50 66V98"/><path d="M50 84C38 74 28 78 26 84C34 90 44 90 50 84Z"/><path d="M50 78C62 68 72 72 74 78C66 84 56 84 50 78Z"/>' },
      { t: 'Seeds', d: 'Add an inner ring and little seeds in the centre, then shade the middle dark.', svg: '<circle cx="50" cy="38" r="6"/><circle cx="46" cy="36" r=".9"/><circle cx="54" cy="36" r=".9"/><circle cx="50" cy="41" r=".9"/><circle cx="50" cy="34" r=".9"/>' },
    ] },
    { id: 'mushroom', title: 'Mushroom', level: 'Nature', time: '10 min', colour: true, desc: 'A spotty toadstool.', steps: [
      { t: 'Cap', d: 'Draw a half-dome for the cap.', svg: '<path d="M14 54C14 28 86 28 86 54Z"/>' },
      { t: 'Stem', d: 'Add a stem that flares out slightly at the bottom.', svg: '<path d="M38 54C38 70 34 82 30 90H70C66 82 62 70 62 54"/>' },
      { t: 'Spots', d: 'Draw round spots on the cap, some big and some small, and a line for the ground.', svg: '<circle cx="36" cy="44" r="5"/><circle cx="56" cy="38" r="4"/><circle cx="70" cy="46" r="3.5"/><path d="M20 94H80"/>' },
    ] },
    { id: 'cactus', title: 'Cactus', level: 'Nature', time: '15 min', colour: true, desc: 'A desert plant in a pot.', steps: [
      { t: 'Main stem', d: 'Draw a tall stem with a rounded top.', svg: '<path d="M42 78V30C42 20 58 20 58 30V78"/>' },
      { t: 'Arms', d: 'Add one arm on each side, bending upwards.', svg: '<path d="M42 62H32C26 62 26 52 26 44C26 40 34 40 34 44V54H42"/><path d="M58 54H68C74 54 74 44 74 36C74 32 66 32 66 36V46H58"/>' },
      { t: 'Pot', d: 'Draw a pot at the bottom.', svg: '<path d="M32 78H68L64 94H36Z"/>' },
      { t: 'Spines and flower', d: 'Add tiny spines with short lines and a small flower on top.', svg: '<path d="M50 34V38M46 46V50M54 52V56M48 62V66M52 70V74M30 48V50M70 40V42"/><circle cx="50" cy="20" r="3"/>' },
    ] },
    { id: 'rainbow', title: 'Rainbow', level: 'Nature', time: '10 min', desc: 'Curves, clouds and sunshine.', steps: [
      { t: 'Arcs', d: 'Draw four curved arcs, one inside the other, all starting on the same line.', svg: '<path d="M10 70A40 40 0 0 1 90 70"/><path d="M18 70A32 32 0 0 1 82 70"/><path d="M26 70A24 24 0 0 1 74 70"/><path d="M34 70A16 16 0 0 1 66 70"/>' },
      { t: 'Clouds', d: 'Cover each end of the rainbow with a puffy cloud.', svg: '<path d="M2 80C2 70 12 70 14 74C18 66 30 70 28 80Z"/><path d="M72 80C72 70 82 70 84 74C88 66 98 70 98 80Z"/>' },
      { t: 'Little sun', d: 'Draw a small sun in the middle with a few rays.', svg: '<circle cx="50" cy="62" r="6"/><path d="M50 50V52M40 54L42 56M60 54L58 56"/>' },
    ] },
    // ---------------- Food & objects ----------------
    { id: 'icecream', title: 'Ice cream', level: 'Food & objects', time: '15 min', colour: true, desc: 'Two scoops with a cherry on top.', steps: [
      { t: 'Cone', d: 'Draw a triangle for the cone, pointing down.', svg: '<path d="M32 50L50 94L68 50Z"/>' },
      { t: 'Scoop', d: 'Draw a rounded scoop that sits on top of the cone.', svg: '<path d="M28 52C22 34 36 24 50 28C64 24 78 34 72 52Z"/>' },
      { t: 'Drips and cherry', d: 'Add three drips along the bottom of the scoop and a cherry on top.', svg: '<path d="M28 52C28 60 36 60 36 52M44 52C44 62 52 62 52 52M60 52C60 58 68 58 68 52"/><circle cx="50" cy="20" r="5"/><path d="M50 15C52 10 56 8 58 8"/>' },
      { t: 'Waffle pattern', d: 'Draw criss-cross lines on the cone for the waffle pattern.', svg: '<path d="M37 60L56 80M42 52L62 76M63 58L45 80M58 52L40 74"/>' },
    ] },
    { id: 'cupcake', title: 'Cupcake', level: 'Food & objects', time: '15 min', colour: true, desc: 'Frosting, sprinkles and a cherry.', steps: [
      { t: 'Wrapper', d: 'Draw the paper wrapper: a wide top and a narrower bottom.', svg: '<path d="M26 56H74L68 90H32Z"/>' },
      { t: 'Frosting', d: 'Draw a wavy swirl of frosting on top of the wrapper.', svg: '<path d="M24 56C22 44 34 40 38 36C38 28 62 28 62 36C66 40 78 44 76 56Z"/>' },
      { t: 'Cherry and sprinkles', d: 'Add a cherry on top and a few tiny sprinkles.', svg: '<circle cx="50" cy="24" r="5"/><path d="M40 46L44 48M56 44L60 46M48 40L51 38"/>' },
      { t: 'Pleats', d: 'Draw lines from top to bottom on the wrapper for the pleats.', svg: '<path d="M34 56L36 90M42 56L43 90M50 56V90M58 56L57 90M66 56L64 90"/>' },
    ] },
    { id: 'mug', title: 'Hot cocoa mug', level: 'Food & objects', time: '10 min', colour: true, desc: 'Warm and steamy.', steps: [
      { t: 'Mug', d: 'Draw the mug: straight sides and a rounded bottom.', svg: '<path d="M24 40H66V78C66 86 60 92 52 92H38C30 92 24 86 24 78Z"/>' },
      { t: 'Handle', d: 'Add a curved handle on the right.', svg: '<path d="M66 48H74C84 48 84 70 72 70H66"/>' },
      { t: 'Steam and stripes', d: 'Draw two curly lines of steam and a pair of stripes on the mug.', svg: '<path d="M38 32C34 26 42 22 38 16M50 32C46 26 54 22 50 16"/><path d="M24 54H66M24 62H66"/>' },
    ] },
    { id: 'rocket', title: 'Rocket', level: 'Food & objects', time: '15 min', colour: true, desc: 'Ready for take-off.', steps: [
      { t: 'Body', d: 'Draw a tall shape with a pointed top for the rocket body.', svg: '<path d="M50 8C66 24 66 56 62 70H38C34 56 34 24 50 8Z"/>' },
      { t: 'Window and fins', d: 'Add a round window and a big fin on each side.', svg: '<circle cx="50" cy="38" r="7"/><path d="M38 56L24 74V86L38 76M62 56L76 74V86L62 76"/>' },
      { t: 'Flame', d: 'Draw a pointy flame coming out of the bottom.', svg: '<path d="M42 70C42 84 46 92 50 96C54 92 58 84 58 70"/>' },
      { t: 'Stars', d: 'Fill the sky with a few stars.', svg: star(14, 20, 6, 2.6) + star(86, 30, 5, 2.2) + star(82, 74, 4, 1.8) + star(16, 66, 4.5, 2) },
    ] },
    { id: 'sailboat', title: 'Sailboat', level: 'Food & objects', time: '15 min', colour: true, desc: 'Sails up on a calm sea.', steps: [
      { t: 'Hull', d: 'Draw the boat body with a flat top and slanted sides.', svg: '<path d="M14 66H86L74 84H26Z"/>' },
      { t: 'Mast', d: 'Draw a tall straight mast in the middle.', svg: '<path d="M50 66V14"/>' },
      { t: 'Sails', d: 'Add a big triangle sail on the right and a smaller one on the left.', svg: '<path d="M50 16L74 62H50Z"/><path d="M46 24L26 62H46Z"/>' },
      { t: 'Sea, flag and sun', d: 'Add wavy water, a flag on the mast and a sun in the sky.', svg: '<path d="M8 90C16 86 24 94 32 90S48 86 56 90S72 94 80 90S92 86 96 90"/><path d="M50 14L60 18L50 22"/><circle cx="82" cy="24" r="7"/>' },
    ] },
    { id: 'umbrella', title: 'Umbrella', level: 'Food & objects', time: '10 min', colour: true, desc: 'Scalloped edge, rainy day.', steps: [
      { t: 'Canopy', d: 'Draw a big dome with a wavy bottom edge.', svg: '<path d="M10 50C10 24 90 24 90 50C84 44 78 44 72 50C66 44 58 44 50 50C42 44 34 44 28 50C22 44 16 44 10 50Z"/>' },
      { t: 'Handle', d: 'Draw a straight pole with a hooked handle.', svg: '<path d="M50 50V84C50 92 40 92 40 84"/>' },
      { t: 'Ribs and rain', d: 'Add lines from the top to the edge and a few raindrops.', svg: '<path d="M50 26C36 28 30 38 28 50M50 26C64 28 70 38 72 50M50 26V50"/><path d="M20 70L18 78M30 80L28 88M70 70L68 78M80 80L78 88"/>' },
    ] },
    { id: 'lighthouse', title: 'Lighthouse', level: 'Food & objects', time: '20 min', colour: true, desc: 'A guiding light by the sea.', steps: [
      { t: 'Tower', d: 'Draw a tall tower that is wider at the bottom.', svg: '<path d="M38 90L42 36H58L62 90Z"/>' },
      { t: 'Lamp room and roof', d: 'Add a small lamp room on top and a pointed roof.', svg: '<path d="M40 36H60V26H40Z"/><path d="M38 26H62L50 14Z"/>' },
      { t: 'Stripes and door', d: 'Add stripes across the tower, a door and a round lamp.', svg: '<path d="M40.5 52H59.5M39.5 68H60.5"/><path d="M46 90V80H54V90"/><circle cx="50" cy="31" r="2.5"/>' },
      { t: 'Light and waves', d: 'Draw beams of light and wavy sea water.', svg: '<path d="M60 31L88 24M60 31L88 38"/><path d="M6 94C14 90 22 98 30 94S46 90 54 94S70 98 78 94S92 90 96 94"/>' },
    ] },
  ];
  more.forEach((l) => LESSONS.push(l));
  void wave;

  // ---------------- Colouring pages (closed shapes, painter order, white fill) ----------------
  const band = (r, w) => `<path d="M${50 - r} 72A${r} ${r} 0 0 1 ${50 + r} 72L${50 + r - w} 72A${r - w} ${r - w} 0 0 0 ${50 - r + w} 72Z"/>`;
  const butterflyHalf = '<path d="M48 44C34 14 8 14 8 34C8 46 28 52 48 52Z"/><path d="M48 54C30 54 14 66 20 80C26 90 42 82 48 66Z"/><circle cx="24" cy="32" r="6"/><circle cx="34" cy="43" r="3"/><circle cx="29" cy="73" r="4"/>';
  const ladySpots = '<circle cx="38" cy="46" r="5"/><circle cx="32" cy="60" r="5"/><circle cx="40" cy="74" r="4.5"/>';
  const sprinkle = (x, y, a) => `<rect transform="rotate(${a} ${x} ${y})" x="${x}" y="${y}" width="5" height="1.8" rx=".9"/>`;

  window.COLOURING = [
    { id: 'c-mandala', title: 'Mandala', inner:
      '<circle cx="50" cy="50" r="47"/><circle cx="50" cy="50" r="42"/>' +
      rot(36, (a) => `<path transform="rotate(${a} 50 50)" d="M50 3V8" fill="none"/>`) +
      rot(12, (a) => `<path transform="rotate(${a} 50 50)" d="M50 8C41 20 41 30 50 38C59 30 59 20 50 8Z"/>`) +
      '<circle cx="50" cy="50" r="12"/><circle cx="50" cy="50" r="6"/>' +
      rot(12, (a) => `<circle transform="rotate(${a} 50 50)" cx="50" cy="22" r="3"/>`) },
    { id: 'c-star', title: 'Star burst', inner:
      '<circle cx="50" cy="50" r="47" fill="none"/><rect x="22" y="22" width="56" height="56" fill="none"/>' +
      '<rect x="22" y="22" width="56" height="56" fill="none" transform="rotate(45 50 50)"/>' +
      '<circle cx="50" cy="50" r="22" fill="none"/><circle cx="50" cy="50" r="10" fill="none"/>' +
      rot(8, (a) => `<path transform="rotate(${a} 50 50)" d="M50 3V28" fill="none"/>`) },
    { id: 'c-life', title: 'Flower of life', inner:
      '<circle cx="50" cy="50" r="48.5" fill="none"/><circle cx="50" cy="50" r="17" fill="none"/>' +
      rot(6, (a) => `<circle cx="${(50 + 17 * Math.cos((a * Math.PI) / 180)).toFixed(2)}" cy="${(50 + 17 * Math.sin((a * Math.PI) / 180)).toFixed(2)}" r="17" fill="none"/>`) +
      rot(6, (a) => `<circle cx="${(50 + 29.44 * Math.cos(((a + 30) * Math.PI) / 180)).toFixed(2)}" cy="${(50 + 29.44 * Math.sin(((a + 30) * Math.PI) / 180)).toFixed(2)}" r="17" fill="none"/>`) },
    { id: 'c-sunflower', title: 'Sunflower', inner:
      '<path d="M47 40V98H53V40Z"/><path d="M50 90C38 78 26 82 24 88C32 96 44 96 50 90Z"/><path d="M50 78C62 66 74 70 76 76C68 84 56 84 50 78Z"/>' +
      sunHead(rot(16, (a) => `<ellipse transform="rotate(${a} 50 42)" cx="50" cy="18" rx="5.5" ry="11"/>`) +
        '<circle cx="50" cy="42" r="15"/><circle cx="50" cy="42" r="9"/>' +
        rot(8, (a) => `<circle transform="rotate(${a} 50 42)" cx="50" cy="30" r="1.8"/>`)) },
    { id: 'c-butterfly', title: 'Butterfly', inner:
      `<g>${butterflyHalf}</g><g transform="translate(100 0) scale(-1 1)">${butterflyHalf}</g>` +
      '<ellipse cx="50" cy="56" rx="4.5" ry="24"/><circle cx="50" cy="29" r="5.5"/>' +
      '<path d="M48 25C44 16 40 14 36 14M52 25C56 16 60 14 64 14" fill="none"/><circle cx="36" cy="14" r="2"/><circle cx="64" cy="14" r="2"/>' },
    { id: 'c-fish', title: 'Happy fish', inner:
      '<path d="M72 50L95 28V72Z"/><path d="M36 33C40 16 58 16 64 36Z"/><path d="M40 68C44 82 58 84 62 66Z"/>' +
      '<path d="M8 50C22 22 60 20 78 50C60 80 22 78 8 50Z"/><path d="M40 36C34 44 34 56 40 64" fill="none"/>' +
      '<circle cx="26" cy="44" r="5"/><circle cx="26" cy="44" r="2"/>' +
      '<circle cx="50" cy="40" r="4"/><circle cx="50" cy="60" r="4"/><circle cx="56" cy="50" r="4"/><circle cx="64" cy="42" r="3.6"/><circle cx="64" cy="58" r="3.6"/><circle cx="70" cy="50" r="3.2"/>' +
      '<circle cx="8" cy="30" r="3"/><circle cx="14" cy="20" r="2.2"/><circle cx="8" cy="11" r="1.8"/>' },
    { id: 'c-owl', title: 'Wise owl', inner:
      '<rect x="6" y="88" width="88" height="7" rx="3.5"/><path d="M26 34L20 10L44 26Z"/><path d="M74 34L80 10L56 26Z"/>' +
      '<ellipse cx="50" cy="56" rx="27" ry="33"/>' +
      '<path d="M26 50C12 62 16 82 34 88C38 74 36 60 26 50Z"/><path d="M74 50C88 62 84 82 66 88C62 74 64 60 74 50Z"/>' +
      '<ellipse cx="50" cy="70" rx="14" ry="17"/><circle cx="44" cy="64" r="3.6"/><circle cx="56" cy="64" r="3.6"/><circle cx="50" cy="74" r="3.6"/><circle cx="44" cy="82" r="3.6"/><circle cx="56" cy="82" r="3.6"/>' +
      '<circle cx="38" cy="42" r="11"/><circle cx="62" cy="42" r="11"/><circle cx="38" cy="42" r="6"/><circle cx="62" cy="42" r="6"/><circle cx="38" cy="42" r="2.4"/><circle cx="62" cy="42" r="2.4"/>' +
      '<path d="M45 52L55 52L50 61Z"/><path d="M40 88L37 96M40 88V96M40 88L43 96M60 88L57 96M60 88V96M60 88L63 96" fill="none"/>' },
    { id: 'c-rocket', title: 'Rocket to space', inner:
      '<circle cx="20" cy="22" r="9"/><ellipse cx="20" cy="22" rx="15" ry="4" transform="rotate(-20 20 22)" fill="none"/>' +
      star(82, 16, 6, 2.6) + star(86, 58, 4.5, 2) + star(12, 68, 4.5, 2) + star(76, 90, 3.5, 1.6) +
      '<path d="M38 56L22 78V90L38 78Z"/><path d="M62 56L78 78V90L62 78Z"/>' +
      '<path d="M41 74C41 88 50 98 50 98C50 98 59 88 59 74Z"/><path d="M46 74C46 83 50 90 50 90C50 90 54 83 54 74Z"/>' +
      '<path d="M50 6C68 22 68 56 62 74H38C32 56 32 22 50 6Z"/><circle cx="50" cy="38" r="8"/><circle cx="50" cy="38" r="4.5"/>' },
    { id: 'c-icecream', title: 'Ice cream', inner:
      '<defs><clipPath id="ccone"><path d="M30 52L50 96L70 52Z"/></clipPath></defs><path d="M30 52L50 96L70 52Z"/>' +
      '<g clip-path="url(#ccone)" fill="none">' +
      Array.from({ length: 8 }, (_, k) => `<path d="M${14 + k * 12} 40L${74 + k * 12} 100"/>`).join('') +
      Array.from({ length: 8 }, (_, k) => `<path d="M${40 + k * 12} 40L${-20 + k * 12} 100"/>`).join('') + '</g>' +
      '<path d="M24 54C18 38 32 28 50 32C68 28 82 38 76 54Z"/>' +
      '<path d="M24 54C24 64 36 64 36 54Z"/><path d="M44 54C44 66 56 66 56 54Z"/><path d="M62 54C62 62 72 62 72 54Z"/>' +
      '<circle cx="50" cy="26" r="15"/><circle cx="50" cy="8" r="4.5"/><path d="M50 4C51 1 54 0 56 1" fill="none"/>' +
      sprinkle(40, 24, 30) + sprinkle(54, 20, -20) + sprinkle(48, 32, 70) + sprinkle(34, 44, 10) + sprinkle(58, 42, -40) },
    { id: 'c-cupcake', title: 'Cupcake', inner:
      '<defs><clipPath id="ccup"><path d="M24 56H76L68 94H32Z"/></clipPath></defs><path d="M24 56H76L68 94H32Z"/>' +
      '<g clip-path="url(#ccup)" fill="none"><path d="M34 56L36 94M42 56L43 94M50 56V94M58 56L57 94M66 56L64 94"/></g>' +
      '<path d="M18 56C12 44 24 36 32 40C34 32 66 32 68 40C76 36 88 44 82 56Z"/>' +
      '<path d="M28 40C24 30 34 24 40 28C42 20 58 20 60 28C66 24 76 30 72 40Z"/>' +
      '<path d="M40 28C40 18 46 12 50 8C54 12 60 18 60 28Z"/><circle cx="50" cy="6" r="4"/>' +
      sprinkle(30, 46, 20) + sprinkle(60, 48, -30) + sprinkle(44, 34, 60) + sprinkle(52, 30, -10) },
    { id: 'c-rainbow', title: 'Rainbow sky', inner:
      '<circle cx="86" cy="14" r="7"/>' +
      '<path d="M0 100V88C20 80 40 86 50 86C60 86 80 80 100 88V100Z"/>' +
      [0, 1, 2, 3, 4, 5].map((k) => band(46 - 6 * k, 6)).join('') + '<path d="M40 72A10 10 0 0 1 60 72Z"/>' +
      '<path d="M-2 88V72C-2 62 10 60 16 64C20 56 34 56 38 64C46 62 50 74 46 88Z"/>' +
      '<g transform="translate(100 0) scale(-1 1)"><path d="M-2 88V72C-2 62 10 60 16 64C20 56 34 56 38 64C46 62 50 74 46 88Z"/></g>' },
    { id: 'c-ladybug', title: 'Ladybug', inner:
      '<path d="M24 46L10 40M22 62L8 62M26 78L12 88M76 46L90 40M78 62L92 62M74 78L88 88" fill="none"/>' +
      '<path d="M34 34A16 14 0 0 1 66 34Z"/>' +
      '<path d="M50 30A29 29 0 0 0 50 88Z"/><path d="M50 30A29 29 0 0 1 50 88Z"/>' +
      ladySpots + `<g transform="translate(100 0) scale(-1 1)">${ladySpots}</g>` +
      '<circle cx="44" cy="27" r="2"/><circle cx="56" cy="27" r="2"/>' +
      '<path d="M44 20C42 12 38 10 34 10M56 20C58 12 62 10 66 10" fill="none"/><circle cx="34" cy="10" r="1.8"/><circle cx="66" cy="10" r="1.8"/>' },
  ];
})();

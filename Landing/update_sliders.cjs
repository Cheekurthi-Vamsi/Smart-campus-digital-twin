const fs = require('fs');
const path = require('path');

const files = [
  'App.tsx',
  'components/DigitalTwin.tsx',
  'components/FacultyPortal.tsx',
  'components/Features.tsx',
  'components/FutureVision.tsx',
  'components/MobileShowcase.tsx',
  'components/StudentPortal.tsx',
];

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join('d:/Smart Campus/Landing/src', file);
  if (!fs.existsSync(filePath)) {
    console.log("Not found:", filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /<section className="relative py-24 overflow-hidden bg-dark-[89]00 rounded-\[2rem\] md:rounded-\[3rem\] border border-white\/5 mx-4 md:mx-8 my-12 shadow-2xl">([\s\S]*?)<div className="relative z-10 flex flex-col overflow-hidden w-full">\s*<ContainerScroll\s+titleComponent=\{\s*<>\s*<h2 className="text-4xl font-semibold text-white(.*?)"/g;

  const newContent = content.replace(regex, (match, p1, p2) => {
    updatedCount++;
    const newP1 = p1.replace(/bg-primary\/5/g, 'bg-primary/10').replace(/bg-secondary\/5/g, 'bg-secondary/10');
    
    const poster = `
        {/* Experimental type poster background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-0 opacity-5 overflow-hidden">
          <h1 className="text-[12vw] font-black text-black whitespace-nowrap uppercase tracking-tighter mix-blend-overlay">
            University and students
          </h1>
        </div>
`;

    return `<section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">${newP1}${poster}        <div className="relative z-10 flex flex-col overflow-hidden w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl font-semibold text-black${p2}" relative z-10`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log("Updated", file);
  }
});

console.log("Total updated:", updatedCount);

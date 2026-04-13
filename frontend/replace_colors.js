import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'src');

// Define replacements mappings
const replacements = [
  // Backgrounds
  { regex: /\bbg-white\b/g, replacement: 'bg-background' },
  { regex: /\bbg-slate-900\b/g, replacement: 'bg-background' },
  { regex: /\bbg-slate-800\b/g, replacement: 'bg-card' },
  { regex: /\bbg-slate-50\b/g, replacement: 'bg-background-light' },
  { regex: /\bbg-gray-50\b/g, replacement: 'bg-background-light' },
  { regex: /\bbg-gray-100\b/g, replacement: 'bg-section' },
  { regex: /\bbg-gray-800\b/g, replacement: 'bg-card' },
  { regex: /\bbg-gray-900\b/g, replacement: 'bg-background' },
  
  // Text
  { regex: /\btext-black\b/g, replacement: 'text-text-primary' },
  { regex: /\btext-slate-900\b/g, replacement: 'text-text-primary' },
  { regex: /\btext-slate-800\b/g, replacement: 'text-text-primary' },
  { regex: /\btext-slate-600\b/g, replacement: 'text-text-secondary' },
  { regex: /\btext-slate-500\b/g, replacement: 'text-text-light' },
  { regex: /\btext-gray-900\b/g, replacement: 'text-text-primary' },
  { regex: /\btext-gray-800\b/g, replacement: 'text-text-primary' },
  { regex: /\btext-gray-600\b/g, replacement: 'text-text-secondary' },
  { regex: /\btext-gray-500\b/g, replacement: 'text-text-light' },
  { regex: /\btext-gray-400\b/g, replacement: 'text-text-light' },
  { regex: /\btext-white\b/g, replacement: 'text-text-primary' },
  
  // Borders
  { regex: /\bborder-gray-300\b/g, replacement: 'border-border' },
  { regex: /\bborder-gray-200\b/g, replacement: 'border-border' },
  { regex: /\bborder-slate-200\b/g, replacement: 'border-border' },
  { regex: /\bborder-slate-300\b/g, replacement: 'border-border' },
  { regex: /\bborder-slate-700\b/g, replacement: 'border-border' },
  
  // Primary (using amber or blue beforehand maybe)
  { regex: /\bbg-amber-500\b/g, replacement: 'bg-primary' },
  { regex: /\btext-amber-500\b/g, replacement: 'text-primary' },
  { regex: /\bbg-amber-500\b/g, replacement: 'bg-primary' },
  { regex: /\bbg-blue-500\b/g, replacement: 'bg-primary' },
  { regex: /\btext-blue-500\b/g, replacement: 'text-primary' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync( fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      // Don't overwrite the script itself if it's there
      if(fullPath.includes('replace_colors.js')) continue;
      
      let content = fs.readFileSync(fullPath, 'utf-8');
      let originalContent = content;
      
      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated: ${fullPath.replace(__dirname, '')}`);
      }
    }
  }
}

console.log('Starting replacements...');
processDirectory(targetDir);
console.log('Done.');

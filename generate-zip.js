import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const zip = new AdmZip();

const filesToInclude = [
  'index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'server.ts',
  'metadata.json',
  'vercel.json',
  'generate-zip.js'
];

const dirsToInclude = [
  'src',
  'assets',
  'api'
];

console.log('Bắt đầu tạo file zip dự án...');

// Thêm các file đơn lẻ
for (const file of filesToInclude) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    zip.addLocalFile(filePath);
    console.log(`- Đã thêm file: ${file}`);
  }
}

// Thêm các thư mục
for (const dir of dirsToInclude) {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    zip.addLocalFolder(dirPath, dir);
    console.log(`- Đã thêm thư mục: ${dir}`);
  }
}

// Ghi file zip
const outputPath = path.join(process.cwd(), 'du_an_van_moc.zip');
zip.writeZip(outputPath);

console.log(`✓ Đã tạo thành công file ZIP tại: ${outputPath}`);
console.log(`Kích thước file: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

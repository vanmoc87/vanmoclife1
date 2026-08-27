import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const outputPath = path.join(process.cwd(), 'du_an_van_moc.zip');

console.log('Bắt đầu tạo file ZIP dự án bằng AdmZip (đồng bộ, đáng tin cậy)...');

try {
  // Xóa file ZIP cũ nếu có
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  const zip = new AdmZip();

  // Danh sách các file đơn lẻ ở thư mục gốc cần đưa vào ZIP
  const filesToInclude = [
    'index.html',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'server.ts',
    'metadata.json',
    'vercel.json',
    '.env.example',
    '.gitignore',
    'firebase-applet-config.json',
    'generate-zip.js'
  ];

  // Thêm các file đơn lẻ vào gốc của ZIP
  for (const file of filesToInclude) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      zip.addLocalFile(filePath);
      console.log(`- Đã thêm file: ${file}`);
    }
  }

  // Danh sách các thư mục cần đưa vào ZIP
  const dirsToInclude = [
    { name: 'src', path: 'src' },
    { name: 'assets', path: 'assets' },
    { name: 'api', path: 'api' },
    { name: 'dist', path: 'dist' }
  ];

  // Thêm các thư mục vào ZIP
  for (const dir of dirsToInclude) {
    const dirPath = path.join(process.cwd(), dir.path);
    if (fs.existsSync(dirPath)) {
      zip.addLocalFolder(dirPath, dir.name);
      console.log(`- Đã thêm thư mục: ${dir.name}`);
    }
  }

  // Ghi file ZIP đồng bộ
  zip.writeZip(outputPath);
  
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`✓ Đã tạo thành công file ZIP tại: ${outputPath}`);
    console.log(`Kích thước file: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  } else {
    throw new Error('Ghi file ZIP không thành công (không tìm thấy file sau khi ghi).');
  }
} catch (error) {
  console.error('Lỗi khi nén file với AdmZip:', error);
  process.exit(1);
}

import fs from 'fs';
import path from 'path';
import { ZipArchive } from 'archiver';

const outputPath = path.join(process.cwd(), 'du_an_van_moc.zip');

console.log('Bắt đầu tạo file ZIP dự án bằng Archiver (độ tương thích cao)...');

// Tạo file stream ghi
const output = fs.createWriteStream(outputPath);
const archive = new ZipArchive({
  zlib: { level: 9 } // Mức nén cao nhất
});

// Lắng nghe các sự kiện của stream
output.on('close', () => {
  console.log(`✓ Đã tạo thành công file ZIP tại: ${outputPath}`);
  console.log(`Kích thước file: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('Cảnh báo:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  console.error('Lỗi khi nén file:', err);
  process.exit(1);
});

// Liên kết dữ liệu nén với file stream
archive.pipe(output);

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
    archive.file(filePath, { name: file });
    console.log(`- Đã thêm file: ${file}`);
  }
}

// Danh sách các thư mục cần đưa vào ZIP
const dirsToInclude = [
  { name: 'src', path: 'src' },
  { name: 'assets', path: 'assets' },
  { name: 'api', path: 'api' },
  { name: 'dist', path: 'dist' } // Thêm thư mục dist đã build (nếu có)
];

// Thêm các thư mục vào ZIP
for (const dir of dirsToInclude) {
  const dirPath = path.join(process.cwd(), dir.path);
  if (fs.existsSync(dirPath)) {
    archive.directory(dirPath, dir.name);
    console.log(`- Đã thêm thư mục: ${dir.name}`);
  }
}

// Hoàn tất quá trình nén
archive.finalize();

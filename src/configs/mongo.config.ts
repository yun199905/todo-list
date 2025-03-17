import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {
  const username = process.env.MONGO_USERNAME;
  // 將 MongoDB 密碼中的特殊字符（如 @, :, ?, & 等）轉換為 URL 安全的格式，不會因為特殊字元導致 URI 解析錯誤
  const password = encodeURIComponent(process.env.MONGO_PASSWORD);
  const resource = process.env.MONGO_RESOURCE;
  const uri = `mongodb+srv://${username}:${password}@${resource}?retryWrites=true&w=majority`;
  console.log({ username, password, resource, uri });
  return { username, password, resource, uri };
});

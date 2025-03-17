import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { USER_MODEL_TOKEN, UserDocument } from 'src/common/models/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CommonUtility } from 'src/core/utils/common.utility';
import { SearchDto } from 'src/core/bases';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  //TODO: 使用hasUser檢驗
  async createUser(user: CreateUserDto) {
    const { username, email, role } = user;
    const password = CommonUtility.encrypyBySalt(user.password);
    const document = await this.userModel.create({
      username,
      password,
      email,
      role,
    });
    return document?.toJSON();
  }

  async findUser(
    filter: FilterQuery<UserDocument>,
    select?: string | string[],
  ) {
    const query = this.userModel.findOne(filter).select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  async findUsers(searchDto: SearchDto, select?: string | string[]) {
    const { skip, limit } = searchDto;
    const query = this.userModel.find().select(select).skip(skip).limit(limit);
    const documents = await query.exec();
    return documents.map((document) => document?.toJSON());
  }

  async deleteUser(userId: string) {
    const document = await this.userModel.findByIdAndDelete(userId).exec();

    if (!document) {
      return;
    }
    return {};
  }

  async updateUser(
    userId: string,
    data: UpdateUserDto,
    select?: string | string[],
  ) {
    const obj: Record<string, any> = { ...data }; //深拷貝物件，避免修改原始值。

    if (obj.password) {
      obj.password = CommonUtility.encrypyBySalt(obj.password);
    }
    const query = this.userModel
      .findByIdAndUpdate(userId, obj, { new: true }) //在更新後返回更新後的文檔，而不是更新前的文檔。
      .select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  existUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.exists(filter);
  }

  async hasUser() {
    const count = await this.userModel.countDocuments().exec();
    return count > 0;
  }
}

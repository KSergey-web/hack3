import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransportDto } from './dto/create-transport.dto';
import { FindAllTransportByCompanyDto } from './dto/find-all-transports-by-company.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Coordinate, CoordinateDocument } from './schemas/coordinate.schema';
import { Transport, TransportDocument } from './schemas/transport.schema';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(Transport.name) private transportModel: Model<TransportDocument>,
   @InjectModel(Coordinate.name) private coordinateModel: Model<CoordinateDocument>
    ){}
    
  async create(dto: CreateTransportDto) {
    const { name, company_id } = dto;
    const transport = await this.transportModel.findOne({ name: dto.name, company: (dto.company_id as any) });
    if (transport) {
      throw new HttpException(`Transport with name ${name} already exists in this`, HttpStatus.BAD_REQUEST);
    }
    const createdTransport = new this.transportModel({name: dto.name, company: (dto.company_id as any), variety: dto.variety});
    return await createdTransport.save();
}

  async getAllTransportsByCompany(dto: FindAllTransportByCompanyDto) {
    return await this.transportModel.find({company: (dto.company_id as any)});
  }

  async getAllCoordinates(): Promise<Array<CoordinateDocument>>{
    let res =  await this.coordinateModel.find({}).populate('transport');
    res.forEach((item)=>{
      item.latitude += 0.0001;
      item.longitude += 0.0001;
      item.save();
    })
    return res;
  }



  update(id: number, updateTransportDto: UpdateTransportDto) {
    return `This action updates a #${id} transport`;
  }

  remove(id: number) {
    return `This action removes a #${id} transport`;
  }
}

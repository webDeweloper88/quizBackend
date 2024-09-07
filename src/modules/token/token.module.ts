import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { SequelizeModule } from '@nestjs/sequelize'
import { Token } from './models/token.model'

@Module({
    imports: [SequelizeModule.forFeature([Token])],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}

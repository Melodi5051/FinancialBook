import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Request } from 'express'; // Импортируйте Request из express
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {}

  
  async create(createTransactionDto: CreateTransactionDto, user: User) {

    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: {id : +createTransactionDto.category},
      user: {id: user.id}
    }
    if (!newTransaction)
      throw new BadRequestException('Что то пошло не так')

    return await this.transactionRepository.save(newTransaction)
  }

  async findAll(id: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: {id}
      },
      relations: {
        category: true
      },
      order: {
        createdAt: 'DESC'
      }
    })
    return transaction;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id
      },
      relations: {
        user: true,
        category: true
      }
    })
    if (!transaction) 
      throw new NotFoundException('Транзакция не найдена')

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id
      }
    })
    if(!transaction) 
      throw new NotFoundException('Транзакция не найдена')

    return await this.transactionRepository.update(id, updateTransactionDto)
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id
      }
    })
    if(!transaction) 
      throw new NotFoundException('Транзакция не найдена')

    return await this.transactionRepository.delete(id)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
      const transaction = await this.transactionRepository.find({
        where: {
          user: {id}
        },
        order: {
          createdAt: 'DESC'
        },
        take: limit,
        skip: (page - 1) * limit
      })
      return transaction
  }

  async findAllByType(id: number, type: string) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: {id},
        type
      }
    })

    const total = transaction.reduce((acc, obj) => acc + obj.amount, 0)
    return total
  }
}

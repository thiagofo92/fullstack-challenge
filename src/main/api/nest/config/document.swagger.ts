import { DocumentBuilder } from '@nestjs/swagger'

export const documentConfig = new DocumentBuilder()
  .setTitle('API - Task manager (Uhuu!)')
  .setDescription('API para o usuário geênciar suas própiras tarefas, criar, atualizar, listar e deletar')
  .setVersion('1.0')
  .addTag('User')
  .addTag('Task')
  .addTag('Archive-Task')
  .addTag('Test')
  .addBearerAuth()
  .build()

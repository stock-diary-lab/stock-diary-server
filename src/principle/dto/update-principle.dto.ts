import { PartialType } from '@nestjs/swagger';
import { CreatePrincipleDto } from './create-principle.dto';

export class UpdatePrincipleDto extends PartialType(CreatePrincipleDto) {}

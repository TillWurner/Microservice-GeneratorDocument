import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {

    //_id: string;
    @Prop({ skipVersioning: true })
    codigo: string;
    @Prop()
    descripcion: string;

}

export const UserSchema = SchemaFactory.createForClass( User );
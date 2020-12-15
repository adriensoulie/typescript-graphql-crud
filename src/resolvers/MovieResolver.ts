import { Movie } from '../entity/Movie';
import { Arg, Mutation, Resolver, Int, Query, Field, InputType } from 'type-graphql';

@InputType()
class MovieInput {

    @Field()
    title: string

    @Field(()=> Int)
    minutes: number
}

@InputType()
class MovieUpdateInput {

    @Field(()=> String, {nullable: true})
    title?: string;

    @Field(()=> Int, {nullable: true})
    minutes?: number;
}



@Resolver()
export class MovieResolver {

    // Create Movie
    @Mutation(()=> Movie)
    async createMovie( 
        @Arg('options', ()=> MovieInput) options: MovieInput,
    ){
        const movie = await Movie.create(options).save()
        return movie;
    }


    // Read Movie List
    @Query( ()=> [Movie])
    movies(){
        return Movie.find()
    }


    // Update Movie
    @Mutation(()=> Boolean)
    async updateMovie(
        @Arg('id', ()=> Int) id:number,
        @Arg('input', ()=> MovieUpdateInput) input: MovieUpdateInput
    ){  
        await Movie.update({id}, input)
        return true;
    }


    // Delete Movie
    @Mutation( ()=> Boolean)
    async deleteMovie(
        @Arg('id', ()=> Int) id:number,
    ){  
        await Movie.delete({id})
        return true;
    }

}
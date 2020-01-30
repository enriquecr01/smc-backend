import { query } from './query';
import { mutation } from './mutation';
import { type } from './type';

export const resolvers = {
    ...query,
    ...mutation,
    ...type
};
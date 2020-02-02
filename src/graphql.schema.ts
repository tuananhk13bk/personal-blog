
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateCategoryInput {
    title: string;
    priority: number;
    level: number;
    parentId?: MongoObjectId;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export class CreatePostInput {
    title: string;
    content: string;
}

export class Category {
    title: string;
    priority: number;
    level: number;
    parentId?: MongoObjectId;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export abstract class IMutation {
    abstract createCategory(createCategoryInput?: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(id: string): Category | Promise<Category>;

    abstract deleteCategory(id: string): Category | Promise<Category>;

    abstract createPost(createPostInput?: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(id: string): Post | Promise<Post>;

    abstract deletePost(id: string): Post | Promise<Post>;
}

export class Post {
    title: string;
    content: string;
}

export abstract class IQuery {
    abstract getAllCategories(): Category[] | Promise<Category[]>;

    abstract getAllPost(): Post[] | Promise<Post[]>;

    abstract getPostById(id: string): Post | Promise<Post>;
}

export abstract class ISubscription {
    abstract postCreated(): Post | Promise<Post>;
}

export type MongoObjectId = any;

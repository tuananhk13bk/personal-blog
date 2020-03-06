
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum CommentStatus {
    Activate = "Activate",
    Deactivate = "Deactivate"
}

export enum RecordStatus {
    Activate = "Activate",
    Pending = "Pending",
    Deactivate = "Deactivate"
}

export enum RequestStatus {
    Success = "Success",
    Failed = "Failed"
}

export enum SocialEnum {
    Facebook = "Facebook",
    Github = "Github",
    Instagram = "Instagram",
    Twitter = "Twitter"
}

export enum SortOrder {
    ascending = "ascending",
    descending = "descending"
}

export enum UserStatus {
    Activate = "Activate",
    Deactivate = "Deactivate"
}

export class CommentAuthorInput {
    id?: MongoObjectId;
    fullname?: string;
    avatar?: string;
}

export class CreateCategoryInput {
    title: string;
    priority: number;
    level: number;
}

export class CreateCommentInput {
    content: string;
    status: CommentStatus;
    author: CommentAuthorInput;
    postId: MongoObjectId;
}

export class CreatePostInput {
    title: string;
    content: string;
    status: RecordStatus;
    author: PostAuthorInput;
    tags?: PostTagInput[];
}

export class CreateTagInput {
    title: string;
    status: RecordStatus;
}

export class GetAllPostsInput {
    page: number;
    itemsPerPage: number;
    tags?: MongoObjectId[];
}

export class GetAllTagsInput {
    status: RecordStatus;
    sort: GetAllTagsSortInput;
}

export class GetAllTagsSortInput {
    title?: SortOrder;
    postsCount?: SortOrder;
    lastUpdatedDate?: SortOrder;
}

export class GetAllUsersInput {
    status?: UserStatus;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PostAuthorInput {
    id: MongoObjectId;
    fullname: string;
    joinDate: Date;
    avatar?: string;
}

export class PostTagInput {
    id?: MongoObjectId;
    title?: string;
}

export class RegisterInput {
    email: string;
    password: string;
    fullname: string;
    status: UserStatus;
    nickname?: string;
    avatar?: Upload;
    occupation?: string;
    social?: SocialInput[];
}

export class SocialInput {
    type: SocialEnum;
    link: string;
}

export class Category {
    id?: MongoObjectId;
    title: string;
    priority: number;
    level: number;
    parentId?: MongoObjectId;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export class Comment {
    id?: MongoObjectId;
    content?: string;
    status?: CommentStatus;
    author?: CommentAuthor;
    postId?: MongoObjectId;
    reply?: CommentReply[];
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export class CommentAuthor {
    id?: MongoObjectId;
    fullname?: string;
    avatar?: string;
}

export class CommentReply {
    id?: MongoObjectId;
    content?: string;
    status?: CommentStatus;
    author?: CommentAuthor;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export class File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export class LoginToken {
    accessToken: string;
}

export abstract class IMutation {
    abstract login(loginInput?: LoginInput): LoginToken | Promise<LoginToken>;

    abstract createCategory(createCategoryInput?: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(id: string): Category | Promise<Category>;

    abstract deleteCategory(id: string): Category | Promise<Category>;

    abstract createComment(createCommentInput?: CreateCommentInput): Comment | Promise<Comment>;

    abstract createPost(createPostInput?: CreatePostInput): MutationSuccessResponse | Promise<MutationSuccessResponse>;

    abstract updatePost(id: string): Post | Promise<Post>;

    abstract deletePost(id: string): Post | Promise<Post>;

    abstract createTag(createTagInput?: CreateTagInput): MutationSuccessResponse | Promise<MutationSuccessResponse>;

    abstract register(registerInput?: RegisterInput): User | Promise<User>;

    abstract deleteUserById(id?: MongoObjectId): User | Promise<User>;
}

export class MutationSuccessResponse {
    message: string;
    status: RequestStatus;
}

export class Post {
    id?: MongoObjectId;
    title?: string;
    content?: string;
    status?: RecordStatus;
    author?: PostAuthor;
    tags?: PostTag[];
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export class PostAuthor {
    id?: MongoObjectId;
    fullname?: string;
    avatar?: string;
}

export class PostsBucket {
    count?: number;
    bucketOrder?: number;
    firstInsertedDate?: Date;
    lastInsertedDate?: Date;
    data?: Post[];
}

export class PostsResponse {
    page: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    data: Post[];
}

export class PostTag {
    id?: MongoObjectId;
    title?: string;
}

export abstract class IQuery {
    abstract getAllCategories(): Category[] | Promise<Category[]>;

    abstract getAllComments(): Comment[] | Promise<Comment[]>;

    abstract getAllPosts(getAllPostsInput?: GetAllPostsInput): PostsResponse | Promise<PostsResponse>;

    abstract getPostById(id: string): Post | Promise<Post>;

    abstract getAllTags(getAllTagsInput?: GetAllTagsInput): Tag[] | Promise<Tag[]>;

    abstract getAllUsers(getAllUsersInput?: GetAllUsersInput): User[] | Promise<User[]>;

    abstract getUserByEmail(email: string): User | Promise<User>;
}

export class Social {
    type: SocialEnum;
    link: string;
}

export abstract class ISubscription {
    abstract postCreated(): Post | Promise<Post>;
}

export class Tag {
    id?: MongoObjectId;
    title?: string;
    status?: RecordStatus;
    postsCount?: number;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export class User {
    id?: MongoObjectId;
    email?: string;
    fullname?: string;
    nickname?: string;
    avatar?: string;
    occupation?: string;
    social?: Social[];
    status?: UserStatus;
    postCount?: number;
    commentCount?: number;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export type MongoObjectId = any;
export type Upload = any;

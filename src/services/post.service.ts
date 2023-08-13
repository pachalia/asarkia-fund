import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  GET_POSTS_ON_HEAD_PAGE,
  I_GET_POSTS_ON_HEAD_PAGE,
} from '../GraphQl/get-posts-on-head-page';
import {
  GET_POSTS_BY_TYPE, GET_POSTS_BY_TYPE_ADMIN,
  I_GET_POST_BY_TYPE,
} from '../GraphQl/get-posts-by-type'
import {
  GET_POST_BY_ID,
  GET_POST_BY_ID_MOBILE,
  I_GET_POST_BY_ID,
  I_GET_POST_BY_ID_MOBILE,
} from '../GraphQl/get-post-by-id'
import {
  GET_POSTS_ON_HEAD_PAGE_FOR_MOBILE,
  I_GET_POSTS_ON_HEAD_PAGE_FOR_MOBILE,
} from '../GraphQl/get-posts-on-head-page-for-mobile';
import {
  GET_MOBILE_POSTS_BY_TYPE,
  I_GET_MOBILE_POST_BY_TYPE,
} from '../GraphQl/get-mobile-posts-by-type';
import { GET_All_POSTS, GET_ID_POSTS, I_ID_GET_POSTS } from '../GraphQl/get-id-all-post'
import { IdPosts, ITypePost, Post } from '../models/posts.model'
import { GET_TYPE_POST, IGET_TYPE_POST } from '../GraphQl/get-type-post'
import { I_GET_ALL_POSTS } from '../GraphQl/get-all-posts'

interface AllPost {
  totalCount: number
  posts: Post[]
  loading?: boolean
  error?: any
}
export class PostService {
  client = new ApolloClient({
    uri: 'https://andreypachalia.ru/api',
    cache: new InMemoryCache(),
  });



  getPostsOnHeadPage() {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_POSTS_ON_HEAD_PAGE>({
          query: GET_POSTS_ON_HEAD_PAGE,
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) =>
            resolve({
              posts: res.data.getPostsOnHeadPage,
              loading: res.loading,
              error: res.error,
            }),
          error: (err) => reject(err.message),
        });
    });
  }

  getPostsByType(id: string, first?: number, offset?: number): Promise<AllPost> {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_POST_BY_TYPE>({
          query: GET_POSTS_BY_TYPE,
          variables: {
            first: first,
            offset: offset,
            id: {
              id: +id,
            },
          },
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) => {
            resolve({
              posts: res.data.getPostByType.edges.map((val) => val.node),
              error: res.error,
              loading: res.loading,
              totalCount: res.data.getPostByType.totalCount,
            });
          },
          error: (err) => {
            reject(err.message);
          },
        });
    });
  }

  getPostById(id: number) {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_POST_BY_ID>({
          query: GET_POST_BY_ID,
          variables: {
            id: id,
          },
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) =>
            resolve({
              post: res.data.getPostById,
              loading: res.loading,
              error: res.error,
            }),
          error: (err) => reject(err.message),
        });
    });
  }

  getPostByIdMobile(id: number) {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_POST_BY_ID_MOBILE>({
          query: GET_POST_BY_ID_MOBILE,
          variables: {
            id: id,
          },
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) =>
            resolve({
              post: res.data.getPostById,
              loading: res.loading,
              error: res.error,
            }),
          error: (err) => reject(err.message),
        });
    });
  }

  getPostsOnHeadPageForMobile() {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_POSTS_ON_HEAD_PAGE_FOR_MOBILE>({
          query: GET_POSTS_ON_HEAD_PAGE_FOR_MOBILE,
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) =>
            resolve({
              posts: res.data.getPostsOnHeadPage,
              loading: res.loading,
              error: res.error,
            }),
          error: (err) => reject(err.message),
        });
    });
  }
  getMobilePostsByType(id: string, first?: number, offset?: number) {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_MOBILE_POST_BY_TYPE>({
          query: GET_MOBILE_POSTS_BY_TYPE,
          variables: {
            first: first,
            offset: offset,
            id: {
              id: +id,
            },
          },
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) => {
            resolve({
              posts: res.data.getPostByType.edges.map((val) => val.node),
              error: res.error,
              loading: res.loading,
              totalCount: res.data.getPostByType.totalCount,
            });
          },
          error: (err) => {
            reject(err.message);
          },
        });
    });
  }

  getIdPosts(): Promise<IdPosts[]> {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_ID_GET_POSTS>({
          query: GET_ID_POSTS,
          variables: {
            offset: 0,
          },
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) =>
            resolve(res.data.getAllPosts.edges.map((val) => val.node)),
        });
    });
  }
  getTypePost() {
    return new Promise((resolve, reject) => {
      this.client.watchQuery<IGET_TYPE_POST>({
        query: GET_TYPE_POST,
        fetchPolicy: 'no-cache'
      })
        .subscribe({
          next: (res) => resolve(res.data.getTypePost)
        })
    })
  }
  getAllPosts(first: number, offset:number):Promise<AllPost> {
    return new Promise((resolve, reject) =>{
      this.client.watchQuery<I_GET_ALL_POSTS>({
        query: GET_All_POSTS,
        variables: {
          first, offset
        },
        fetchPolicy: 'no-cache'
      })
        .subscribe({
          next: (resp) => resolve({totalCount:resp.data.getAllPosts.totalCount, posts: resp.data.getAllPosts.edges.map((val)=>val.node)})
        })
    })
  }

  getPostsByTypeAdmin(id: string, first?: number, offset?: number): Promise<AllPost> {
    return new Promise((resolve, reject) => {
      this.client
        .watchQuery<I_GET_POST_BY_TYPE>({
          query: GET_POSTS_BY_TYPE_ADMIN,
          variables: {
            first: first,
            offset: offset,
            id: {
              id: +id,
            },
          },
          fetchPolicy: 'no-cache',
        })
        .subscribe({
          next: (res) => {
            resolve({
              posts: res.data.getPostByType.edges.map((val) => val.node),
              error: res.error,
              loading: res.loading,
              totalCount: res.data.getPostByType.totalCount,
            });
          },
          error: (err) => {
            reject(err.message);
          },
        });
    });
  }
}

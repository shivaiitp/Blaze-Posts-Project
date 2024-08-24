import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard, PostLoading } from '../components/index';
import { fetchPosts, selectAllPosts, selectPostsStatus, selectPostsError } from '../store/postSlice';

function Home() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const error = useSelector(selectPostsError);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const user = await authService.getCurrentUser();
                setLoginStatus(!!user);
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (loginStatus && postsStatus === 'idle') {
            const fetchPostsAsync = async () => {
                setPostsLoading(true);
                try {
                    await dispatch(fetchPosts()).unwrap();
                } catch (error) {
                    console.error("Error fetching posts:", error);
                } finally {
                    setPostsLoading(false);
                }
            };

            fetchPostsAsync();
        }
    }, [loginStatus, postsStatus, dispatch]);

    if (loading) {
        return (
            <div className='flex justify-center items-center w-full h-full'>
                <button type="button" className='flex items-center p-2 text-black rounded' disabled>
                    <svg className="animate-spin h-6 w-6 mr-3 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-4a4 4 0 0 0-8 0H4z"></path>
                    </svg>
                    Loading...
                </button>
            </div>
        );
    }

    if (!loginStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-2">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // console.log(posts);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-between'>
                    {postsLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <PostLoading key={index} />
                        ))
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                            {posts.length === 0 ? (
                                <div className="flex justify-center items-center w-full h-full text-center">
                                <div className="p-2">
                                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                        No posts available
                                    </h1>
                                </div>
                            </div>
                            
                            ) : (
                                posts.map((post) => (
                                    <PostCard key={post.$id} {...post} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;

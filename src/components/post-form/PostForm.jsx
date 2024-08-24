import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index/";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingButton from "../LoadingButton";

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [showError, setShowError] = useState({ title: false, image: false });

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const submit = async (data) => {
        setLoading(true);
        try {
            let file;
            if (data.image?.[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
            }
            if (post) {
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                navigate(`/post/${dbPost.$id}`);
            } else {
                if (file) {
                    data.featuredImage = file.$id;
                }
                // console.log(userData);
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Handle the error here (e.g., display a message to the user)
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-") || "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    useEffect(() => {
        if (errors.title || errors.image) {
            setShowError({ title: !!errors.title, image: !!errors.image });

            // Watch for changes in the specific fields we care about (e.g., title, image)
            const subscription = watch((value, { name }) => {
                if (name === "title" || name === "image") {
                    setShowError({ title: false, image: false });
                }
            });

            return () => subscription.unsubscribe(); // Clean up the watcher when the component unmounts or error changes
        }
    }, [errors.title, errors.image, watch]);



    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: "Slug is required" })}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    rules={{ required: "Content is required" }}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    name="image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: "Image is required" })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />

                {(showError.title || showError.image) && (
                    <div className="mb-4 text-red-500">
                        {showError.title
                            ? errors.title?.message
                            : errors.image?.message
                        }
                    </div>
                )}

                {loading ? (
                    <LoadingButton isLoading={true} bgColor="bg-green-500" disabled>
                        Submitting...
                    </LoadingButton>
                ) : (
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-500" : "bg-blue-800"}  // Default bg color when post is not present
                        className={`${post ? "hover:bg-green-600" : "hover:bg-blue-600"} w-full`} // Adjust hover based on post existence
                    >
                        {post ? "Update" : "Submit"}
                    </Button>

                )}
            </div>
        </form>
    );
}

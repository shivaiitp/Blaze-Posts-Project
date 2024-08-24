import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoaded } from '../store/tinyMceSlice';
import { Controller } from 'react-hook-form';
const LazyEditor = React.lazy(() => import('@tinymce/tinymce-react').then(module => ({ default: module.Editor })));

export default function RTE({ name, control, label, defaultValue = "" }) {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.tinyMce.loaded);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(setLoaded());
    }
  }, [isLoaded, dispatch]);

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      {isLoaded && (
        <Suspense fallback={<div>Loading editor...</div>}>
          <Controller
            name={name || "content"}
            control={control}
            render={({ field: { onChange } }) => (
              <LazyEditor
                apiKey='c3aaesuiet5vmsaykdp4g7hzqai8bxr5hjreffi4yrdupjqj'
                initialValue={defaultValue}
                init={{
                  initialValue: defaultValue,
                  height: 500,
                  menubar: true,
                  plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                  ],
                  toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
                onEditorChange={onChange}
              />
            )}
          />
        </Suspense>
      )}
    </div>
  );
}

"use client";

import LoadingBox from "@/app/components/LoadingBox";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AvatarEditor from "react-avatar-editor";
import Heading from "../../Heading";
import axios from "axios";
import { useRouter } from "next/navigation";

const cache: any = {};

const getImageBlob = (url: string) => {
  return axios
    .get(url, {
      responseType: "blob",
    })
    .then(
      (data) => new File([data.data], "avatar.png", { type: data.data.type })
    );
};

const AvatarForm = () => {
  const router = useRouter();
  const avatarEndpoint = "/api/user/settings/avatar";
  const defaultAvatarURL = "/images/avatars/default.jpg";

  const [isLoading, setIsLoading] = useState<boolean>(
    !Boolean(cache[avatarEndpoint])
  );
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<string | File | null>(null);
  const canvasRef = useRef<AvatarEditor | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const hasMoved = useRef<boolean>(false);

  useEffect(() => {
    setZoom(1);
  }, [file]);

  const getAvatar = useCallback(() => {
    if (cache[avatarEndpoint]) {
      setFile(cache[avatarEndpoint]);
    } else {
      axios
        .get(avatarEndpoint)
        .then((data) => {
          if (data.data.avatar) {
            getImageBlob(data.data.avatar).then((data) => {
              setFile(data);
              cache[avatarEndpoint] = data;
            });
          } else {
            setFile(defaultAvatarURL);
            cache[avatarEndpoint] = defaultAvatarURL;
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  const handleSendAvatar = () => {
    if (file === "") return;
    setIsLoading(true);
    axios
      .post(avatarEndpoint, {
        avatar: canvasRef.current!.getImageScaledToCanvas().toDataURL(),
      })
      .then((data) => {
        toast.success("Pomyślnie zmieniono avatar!");
        getImageBlob(data.data.avatar).then((data) => {
          setFile(data);
          cache[avatarEndpoint] = data;
        });
        router.refresh();
      })
      .catch((err) => {
        toast.error("Wystąpił problem przy zapisie avatara!");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const editor = (
    <AvatarEditor
      className="mx-auto"
      crossOrigin={`anonymous`}
      ref={canvasRef}
      image={file!}
      width={204}
      height={204}
      border={0}
      scale={zoom}
      onPositionChange={() => {
        hasMoved.current = true;
      }}
      onMouseUp={() => {
        if (!hasMoved.current) {
          fileInput!.current!.click();
        }
        hasMoved.current = false;
      }}
    />
  );

  return (
    <>
      <Heading>Avatar</Heading>
      <form className="relative">
        <div
          className="mx-auto mb-[25px]"
          style={isLoading ? { opacity: "0.8" } : {}}
        >
          {file ? (
            editor
          ) : (
            <div
              style={{
                width: "204px",
                height: "204px",
                backgroundColor: "black",
                margin: "0 auto",
              }}
            />
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            style={{ display: "none" }}
            disabled={isLoading}
            onChange={(e) => {
              if (e.target?.files?.[0])
                setFile(URL.createObjectURL(e.target?.files?.[0]));
            }}
          />
        </div>
        <p
          className="text-center py-4"
          style={isLoading ? { opacity: "0.8" } : {}}
        >
          <small>
            <i>
              Avatar nie może zawierać treści +18, ustawienie ich będzie
              skutkowało banem perm.
            </i>
          </small>
        </p>
        <p
          className="text-center pb-4"
          style={isLoading ? { opacity: "0.8" } : {}}
        >
          <small>Kliknij obrazek aby go zmienić.</small>
        </p>
        <input
          className="block mx-auto mb-4 disabled:opacity-80"
          type="range"
          min="1"
          max="3"
          disabled={isLoading}
          step="0.02"
          value={String(zoom)}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <Button disabled={isLoading} onClick={handleSendAvatar}>
          Zapisz
        </Button>
        {isLoading && <LoadingBox />}
      </form>
    </>
  );
};

export default AvatarForm;

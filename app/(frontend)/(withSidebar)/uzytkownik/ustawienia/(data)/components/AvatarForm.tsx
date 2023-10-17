"use client";

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AvatarEditor from "react-avatar-editor";
import Heading from "../../components/Heading";
import axios from "axios";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const getImageBlob = (url: string) => {
  return axios
    .get(url, {
      responseType: "blob",
    })
    .then(
      (data) => new File([data.data], "avatar.png", { type: data.data.type })
    );
};

const AvatarForm = ({ avatar }: { avatar: string }) => {
  const router = useRouter();
  const avatarEndpoint = "/api/user/settings/avatar";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<string | File | null>(null);
  const canvasRef = useRef<AvatarEditor | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const hasMoved = useRef<boolean>(false);

  useEffect(() => {
    setZoom(1);
  }, [file]);

  useEffect(() => {
    getImageBlob(avatar).then((data) => {
      setFile(data);
    });
  }, [avatar]);

  const handleSendAvatar = () => {
    if (file === "") return;
    setIsLoading(true);
    axios
      .post(avatarEndpoint, {
        avatar: canvasRef.current!.getImageScaledToCanvas().toDataURL(),
      })
      .then(() => {
        toast.success("Pomyślnie zmieniono avatar!");
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
          className={clsx(
            "mx-auto mb-[25px] relative",
            isLoading && "opacity-60"
          )}
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
          {isLoading && <div className="absolute top-0 left-0 w-full h-full" />}
        </div>
        <p className="py-4 text-center">
          <small>
            <i>
              Avatar nie może zawierać treści +18, ustawienie ich będzie
              skutkowało banem perm.
            </i>
          </small>
        </p>
        <p className="pb-4 text-center">
          <small>Kliknij obrazek aby go zmienić.</small>
        </p>
        <input
          className="block mx-auto mb-4 disabled:opacity-60"
          type="range"
          min="1"
          max="3"
          disabled={isLoading}
          step="0.02"
          value={String(zoom)}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handleSendAvatar}
        >
          Zapisz
        </Button>
      </form>
    </>
  );
};

export default AvatarForm;

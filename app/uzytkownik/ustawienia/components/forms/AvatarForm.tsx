"use client";

import LoadingBox from "@/app/components/LoadingBox";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AvatarEditor from "react-avatar-editor";
import Heading from "../Heading";
import axios from "axios";

const cache: any = {};

const AvatarForm = () => {
  const avatarEndpoint = "/api/user/settings/avatar";
  const [isLoading, setIsLoading] = useState<boolean>(
    !Boolean(cache[avatarEndpoint])
  );
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<string | null>(null);
  const canvasRef = useRef<AvatarEditor | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const hasMoved = useRef<boolean>(false);

  useEffect(() => {
    setZoom(1);
  }, [file]);

  useEffect(() => {
    if (cache[avatarEndpoint]) {
      setFile(cache[avatarEndpoint]);
    } else {
      axios
        .get(avatarEndpoint)
        .then((data) => {
          cache[avatarEndpoint] = data.data.avatar;
          setFile(data.data.avatar);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleSendAvatar = () => {
    if (file === "") return;
    setIsLoading(true);
    axios
      .post(avatarEndpoint, {
        avatar: canvasRef.current!.getImage().toDataURL(),
      })
      .then((data) => {
        toast.success("Pomyślnie zmieniono avatar!");
        setFile(data.data.avatar);
      })
      .catch((err) => {
        toast.error("Wystąpił problem przy zapisie avatara!");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Heading>Avatar</Heading>
      <form className="relative">
        <div className="mx-auto mb-[25px]">
          <AvatarEditor
            className="mx-auto"
            ref={canvasRef}
            image={file || "/images/avatars/default.jpg"}
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
        <p className="text-center py-4">
          <small>
            <i>
              Avatar nie może zawierać treści +18, ustawienie ich będzie
              skutkowało banem perm.
            </i>
          </small>
        </p>
        <p className="text-center pb-4">
          <small>Kliknij obrazek aby go zmienić.</small>
        </p>
        <input
          className="block mx-auto mb-4"
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

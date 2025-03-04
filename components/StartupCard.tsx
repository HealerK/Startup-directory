import { StartupCardType } from "@/app/(root)/page";
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _id,
    _createdAt,
    views,
    author,
    description,
    image,
    category,
    title,
  } = post;

  // Add null check for author
  const authorName = author?.name;
  const authorId = author?._id;
  const authorImage = author?.image;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">
          {formatDate(_createdAt?.toString() || new Date().toISOString())}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/startup/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{authorName}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="font-bold text-2xl line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src={authorImage || "/placeholder-user.png"}
            alt="user profile"
            width={48}
            height={48}
            className="rounded-full w-[48px] h-[48px]"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc line-clamp-2">{description}</p>
        <Image
          src={image || "/placeholder-user.png"}
          alt="wall-e"
          width={300}
          height={200}
          className="startup-card-img mt-3"
          priority
        />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase() ?? "all"}`}>
          <p className="text-16-medium">{category ?? "Uncategorized"}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeeton" />
      </li>
    ))}
  </>
);

export default StartupCard;

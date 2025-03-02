"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const formData = Object.fromEntries(form.entries());

  const { title, description, category, link } = formData;

  // Validate that title exists and is a string
  if (!title || typeof title !== "string") {
    return parseServerActionResponse({
      error: "Title is required and must be a string",
      status: "ERROR",
    });
  }

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: String(session.id),
      },
      pitch,
    };
    const result = await writeClient.create({ _type: "startup", ...startup });
    console.log(result);
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

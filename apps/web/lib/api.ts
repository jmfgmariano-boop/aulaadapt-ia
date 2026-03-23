import { NextResponse } from "next/server";
import { demoApiMeta } from "./demo";

export function demoJson<T>(data: T, message?: string) {
  return NextResponse.json({
    ok: true,
    meta: demoApiMeta,
    message,
    data
  });
}

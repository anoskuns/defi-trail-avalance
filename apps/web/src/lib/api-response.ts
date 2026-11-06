import { NextResponse } from "next/server";

export interface ErrorEnvelope {
  error: {
    code: string;
    message: string;
    retryable: boolean;
    requestId?: string;
  };
}

export function errorResponse(
  code: string,
  message: string,
  status: number,
  options?: { retryable?: boolean; requestId?: string }
): NextResponse<ErrorEnvelope> {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        retryable: options?.retryable ?? false,
        ...(options?.requestId ? { requestId: options.requestId } : {}),
      },
    },
    { status }
  );
}

export function successResponse<T>(data: T, status: number = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}


import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-response";
import { authenticateOrganizer } from "@/lib/organizer-auth";
import {
  getOrganizerContentService,
  OrganizerContentError,
} from "@/lib/organizer-content-service";

export const dynamic = "force-dynamic";

interface OrganizerMutationBody {
  action?: unknown;
  content?: unknown;
  expectedPublishedVersion?: unknown;
  confirmation?: unknown;
  sourceVersion?: unknown;
}

function authenticate(req: NextRequest) {
  const result = authenticateOrganizer(req.headers.get("authorization"));
  if (result.identity) return result;
  return NextResponse.json(
    {
      error: {
        code: result.code,
        message:
          result.status === 403
            ? "The authenticated account does not have the organizer role."
            : "A valid organizer bearer token is required.",
        retryable: false,
      },
    },
    { status: result.status ?? 401 },
  );
}

function workspaceResponse() {
  return NextResponse.json(
    { workspace: getOrganizerContentService().getWorkspace() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET(req: NextRequest) {
  const authentication = authenticate(req);
  if (authentication instanceof NextResponse) return authentication;
  return workspaceResponse();
}

export async function POST(req: NextRequest) {
  const authentication = authenticate(req);
  if (authentication instanceof NextResponse) return authentication;
  const actorId = authentication.identity!.actorId;

  let body: OrganizerMutationBody;
  try {
    body = (await req.json()) as OrganizerMutationBody;
  } catch {
    return errorResponse("INVALID_PAYLOAD", "Request body must be valid JSON.", 400);
  }

  const service = getOrganizerContentService();
  try {
    switch (body.action) {
      case "SAVE_DRAFT":
        service.saveDraft(body.content, actorId);
        break;
      case "PUBLISH":
        if (typeof body.expectedPublishedVersion !== "number") {
          return errorResponse("INVALID_PAYLOAD", "expectedPublishedVersion is required.", 400);
        }
        service.publish({
          actorId,
          expectedPublishedVersion: body.expectedPublishedVersion,
          confirmation: String(body.confirmation ?? ""),
        });
        break;
      case "ARCHIVE":
        if (typeof body.expectedPublishedVersion !== "number") {
          return errorResponse("INVALID_PAYLOAD", "expectedPublishedVersion is required.", 400);
        }
        service.archive({
          actorId,
          expectedPublishedVersion: body.expectedPublishedVersion,
          confirmation: String(body.confirmation ?? ""),
        });
        break;
      case "RESTORE_VERSION":
        if (typeof body.sourceVersion !== "number") {
          return errorResponse("INVALID_PAYLOAD", "sourceVersion is required.", 400);
        }
        service.restoreVersion(body.sourceVersion, actorId);
        break;
      default:
        return errorResponse("INVALID_ACTION", "Unsupported organizer action.", 400);
    }
    return workspaceResponse();
  } catch (error: unknown) {
    if (error instanceof OrganizerContentError) {
      return errorResponse(error.code, error.message, error.status);
    }
    return errorResponse(
      "ORGANIZER_CONTENT_UNAVAILABLE",
      "Organizer content could not be updated.",
      500,
      { retryable: true },
    );
  }
}

"""Uniform JSON error responses for unhandled exceptions."""
import logging

from fastapi import Request, status
from fastapi.responses import JSONResponse

logger = logging.getLogger("ve_advisor.errors")


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Something went wrong on our end. Please try again."},
    )

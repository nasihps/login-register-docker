from fastapi import APIRouter

test_router = APIRouter()


############
#USER ROUTES 
############

@test_router.get("/greet")
def greet():
    return {"good":"morning"}


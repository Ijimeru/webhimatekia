import factory
from factory.faker import faker
from . import models
import random

FAKE = faker.Faker()


class CategoryFactory(factory.Factory):
    class Meta:
        model = models.Category
    name = factory.Faker('name')


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Post

    @staticmethod
    def getUserId():
        user = models.User.objects.all()
        allId = set()
        for i in user:
            allId.add(i.id)  # type: ignore
        return random.choice(list(allId))
    title = factory.Faker('sentence', nb_words=12)
    author = models.User.objects.get(id=getUserId())
    publisher = factory.Faker('name')
    status = "draft"

    @factory.post_generation
    def kategori(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for group in extracted:
                self.kategori.add(group)  # type:ignore

    @factory.lazy_attribute
    def content(self):
        x = ""
        for _ in range(0, 5):
            x += "\n" + FAKE.paragraph(nb_sentences=30) + "\n"
        return x

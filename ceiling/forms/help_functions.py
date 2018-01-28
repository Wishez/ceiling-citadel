from personal_data.models import Consumer

def get_or_create_consumer(data):
    full_name = data.get('full_name')
    shared_name = full_name.split(' ')
    # Return query set with filtered consultants.
    consumer = Consumer.objects.is_consumer(
        shared_name[1],
        shared_name[0]
    )

    if consumer.count() == 0:
        consumer = Consumer()

        if 'phone_number' in data:
            consumer.phone_number = data.get('phone_number')
        if 'email' in data:
            consumer.email = data.get('email')

        consumer = Consumer.objects.fill_name_by_fields_and_save(
            consumer,
            full_name
        )
    else:
        consumer = consumer[0]

    return consumer

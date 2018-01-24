from django import template


register = template.Library()

def get_responsive_height(height, width):
    return height / width * 100

def get_array(model):
    return model.all()


register.filter('get_responsive_height', get_responsive_height)
register.filter('get_array', get_array)
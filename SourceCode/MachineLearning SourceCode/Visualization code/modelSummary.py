import sys
import tensorflow as tf
ARG=None
for arg in sys.argv:
    print('path enter:')
    ARG=arg
    print(arg)

new_model = tf.keras.models.load_model(ARG)

# Check its architecture
new_model.summary()
from app.controllers.emojifier import bp
from flask import request, jsonify
import numpy as np
from app.models import User, GloveEmbedding
from app.controllers.errors import bad_request
from app.controllers.emojifier.helpers import prepare_sentence, label_to_emoji, get_model
import tensorflow as tf

# intialize graph  and model
emojifier_model = get_model()
graph = tf.get_default_graph()

@bp.route("/getemoji", methods=["POST"])
def get_emoji():
    try:
        data = request.get_json()
        sentence = data["sentence"]
            
        # get pre-intialized graph and model
        global emojifier_model, graph
        embeddings = prepare_sentence(sentence)

        # create new graph and get predictions
        emojis = {}
        with graph.as_default():
            predict_val = emojifier_model.predict(embeddings)
            for i in range(int(3)):
                max_idx = np.argmax(predict_val)
                predict_val[0, max_idx] = -1
                emojis[str(i)] = label_to_emoji(max_idx)
        
        return jsonify({"emojis": emojis})
        
    except KeyError:
        return bad_request("Wrong arguments")
        